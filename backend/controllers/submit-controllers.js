const Submission = require("../model/Submission");
const Problem = require("../model/Problem");
const { compileCode1 } = require("./submission-controllers");

const submitCode = async (req, res) => {
  const { userId, problemId, language, code } = req.body;

  try {
    // Fetch the problem details
    const problem = await Problem.findById(problemId);
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    // Compile the code and get the output
    const { filepath, output } = await compileCode1(req, res);

    // Check if the output matches the testOutputs
    const testInputs = problem.testInputs;
    const testOutputs = problem.testOutputs;
    let verdict = "success";
    if (testInputs.length !== testOutputs.length) {
      verdict = "error";
    } else {
      for (let i = 0; i < testInputs.length; i++) {
        const customInput = testInputs[i];
        const expectedOutput = testOutputs[i];
        const { output: testOutput } = await compileCode1({
          body: { language, code, customInput },
        });

        if (testOutput.trim() !== expectedOutput.trim()) {
          verdict = "error";
          break;
        }
      }
    }

    // Save the submission to the database with the updated verdict and status
    const submission = new Submission({
      userId,
      problemId,
      language,
      code,
      filepath,
      output,
      verdict,
      status: verdict === "success" ? "success" : "error",
    });

    await submission.save();

    return res.status(201).json({ message: "Code submitted successfully", verdict });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.submitCode = submitCode;
