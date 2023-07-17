const Submission = require("../model/Submission");
const User = require("../model/User");

const viewSubmissions = async (req, res) => {
  const { userId } = req.params;

  try {
    const submissions = await Submission.find({ userId }).populate("problemId");
    const user = await User.findById(userId);
    return res.status(200).json({ success: true, submissions, userName: user.name });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
};

module.exports = { viewSubmissions };
