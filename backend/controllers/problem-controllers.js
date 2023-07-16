const Problem = require("../model/Problem");

const addProblem = async (req, res, next) => {
  const { problemName, problemStatement, sampleInputs, sampleOutputs, level, testInputs, testOutputs} = req.body;

  try {
    const problem = new Problem({
      problemName,
      problemStatement,
      sampleInputs,
      sampleOutputs,
      level,
      testInputs,
      testOutputs,
    });

    await problem.save();

    return res.status(201).json({ message: "Problem added successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getProblems = async (req,res,next) => {
  try {
    const problems = await Problem.find();
    return res.status(200).json({ problems });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });

}
};

const getProblemDetails = async (req, res, next) => {
  const problemId = req.params.problemId;

  try {
    const problem = await Problem.findById(problemId);
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }
    const { problemName, problemStatement, sampleInputs, sampleOutputs } = problem;

    return res
      .status(200)
      .json({ problemName, problemStatement, sampleInputs, sampleOutputs });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};


exports.addProblem = addProblem;
exports.getProblems = getProblems;
exports.getProblemDetails = getProblemDetails;
