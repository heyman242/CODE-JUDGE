const Problem = require("../model/Problem");

const addProblem = async (req, res, next) => {
  const { problemName, problemStatement, sampleInputs, sampleOutputs, level } = req.body;

  try {
    const problem = new Problem({
      problemName,
      problemStatement,
      sampleInputs,
      sampleOutputs,
      level,
    });

    await problem.save();

    return res.status(201).json({ message: "Problem added successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.addProblem = addProblem;
