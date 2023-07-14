const User = require('../model/User');
const bcrypt = require('bcryptjs')


const signup = async(req, res, next)=>{

    const {name, email, password} = req.body;
    let existingUser;

    try{
        existingUser = await  User.findOne({email:email});
    }catch{
        console.log(err);
    }

    if(existingUser){
        return res.status(400).json({message:"User already exists! login instead."});
    }

    const hashedPassword = bcrypt.hashSync(password);
    const user = new User({
         name,
         email,
         password:hashedPassword,
    });

    try{
        await  user.save();
    }catch{
        console.log(err);
    }
    return res.status(201).json({message:user});
}

const login = async (req,res,next)=>{
    const{email,password} =req.body;
    let existingUser;

    try{
        existingUser = await User.findOne({email:email});
    }catch (err){
        return new Error(err);
    }

    if(!existingUser){
        return res.status(400).json({message:"user not found. Signup please"});
    }
    const isPasswordCorrect = bcrypt.compareSync(password,existingUser.password);

    if(!isPasswordCorrect){
        return res.status(400).json({message:"invaild Email/Password"}); 
    }
    return res.status(200).json({message:"Successully Logged In"});

}

exports.signup = signup;
exports.login = login;