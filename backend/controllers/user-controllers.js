const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists! Login Instead" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    return res.status(201).json({ message: user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return res.status(400).json({ message: "User not found. Signup Please" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid Email / Password" });
    }

    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1000000s",
    });

    console.log("Generated Token:\n", token);

    res.cookie(String(existingUser._id), token, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 100000), // 30 seconds
      httpOnly: true,
      sameSite: "lax",
    });

    return res.status(200).json({ message: "Successfully Logged In", user: existingUser, token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const verifyToken = (req, res, next) => {
  const cookies = req.headers.cookie;
  const token = cookies && cookies.split("=")[1];
  if (!token) {
    return res.status(404).json({ message: "No token found" });
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(400).json({ message: "Invalid Token" });
    }
    console.log(user.id);
    req.id = user.id;
    next();
  });
};

const getUser = async (req, res, next) => {
  const userId = req.id;
  try {
    const user = await User.findById(userId, "-password");
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    return res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const refreshToken = (req, res, next) => {
  const cookies = req.headers.cookie;
  const prevToken = cookies && cookies.split("=")[1];
  if (!prevToken) {
    return res.status(400).json({ message: "Couldn't find token" });
  }
  jwt.verify(prevToken, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      console.error(err);
      return res.status(403).json({ message: "Authentication failed" });
    }
    res.clearCookie(user.id);
    req.cookies[user.id] = "";

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "100000s",
    });
    console.log("Regenerated Token:\n", token);

    res.cookie(user.id, token, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 100000), // 30 seconds
      httpOnly: true,
      sameSite: "lax",
    });

    req.id = user.id;
    next();
  });
};

const logout = (req, res, next) => {
  const cookies = req.headers.cookie;
  const prevToken = cookies && cookies.split("=")[1];
  if (!prevToken) {
    return res.status(400).json({ message: "Couldn't find token" });
  }
  jwt.verify(prevToken, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      console.error(err);
      return res.status(403).json({ message: "Authentication failed" });
    }
    res.clearCookie(user.id);
    req.cookies[user.id] = "";
    return res.status(200).json({ message: "Successfully Logged Out" });
  });
};

exports.logout = logout;
exports.signup = signup;
exports.login = login;
exports.verifyToken = verifyToken;
exports.getUser = getUser;
exports.refreshToken = refreshToken;
