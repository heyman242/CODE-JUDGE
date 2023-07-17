const Submission = require("../model/Submission");

const viewSubmissions = async (req, res) => {
  const { userId } = req.params;

  try {
    const submissions = await Submission.find({ userId }).populate("problemId");
    return res.status(200).json({ success: true, submissions });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
};

module.exports = { viewSubmissions };
