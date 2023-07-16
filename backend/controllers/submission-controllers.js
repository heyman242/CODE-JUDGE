const Submission = require("../model/Submission");
const path = require("path");
const fs = require("fs");
const { v4: uuid } = require("uuid");
const { exec } = require("child_process");

const baseDir = path.join(__dirname, "..");
const codesPath = path.join(baseDir, "codes");
const outputsPath = path.join(baseDir, "outputs");

// Create the codes and outputs directories if they don't exist
if (!fs.existsSync(codesPath)) {
  fs.mkdirSync(codesPath, { recursive: true });
}

if (!fs.existsSync(outputsPath)) {
  fs.mkdirSync(outputsPath, { recursive: true });
}

const generateFile = async (format, content) => {
  const jobId = uuid();
  const filename = `${jobId}.${format}`;
  const filepath = path.join(codesPath, filename);
  await fs.writeFileSync(filepath, content);
  return filepath;
};

const executeCpp = (filepath, customInput) => {
  return new Promise((resolve, reject) => {
    const command = `g++ ${filepath} -o ${filepath}.out && echo "${customInput}" | ${filepath}.out`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject({ error, stderr });
      } else {
        resolve(stdout);
      }
    });
  });
};



const executePy = (filepath, customInput) => {
  return new Promise((resolve, reject) => {
    exec(
      `echo "${customInput}" | python3 ${filepath}`,
      (error, stdout, stderr) => {
        if (error) {
          reject({ error, stderr });
        } else {
          resolve(stdout);
        }
      }
    );
  });
};


const compileCode = async (req, res) => {
  const { language = "cpp", code, customInput } = req.body;
  if (!code) {
    return res.status(400).json({ success: false, error: "Empty code body" });
  }

  try {
    const filepath = await generateFile(language, code);
    let output = "";

    if (language === "cpp") {
      output = await executeCpp(filepath, customInput);
    } else if (language === "py") {
      output = await executePy(filepath, customInput);
    }

    return res.status(200).json({ filepath, output });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

const compileCode1 = async (req, res) => {
  const { language = "cpp", code, customInput } = req.body;
  if (!code) {
    return res.status(400).json({ success: false, error: "Empty code body" });
  }

  try {
    const filepath = await generateFile(language, code);
    let output = "";

    if (language === "cpp") {
      output = await executeCpp(filepath, customInput);
    } else if (language === "py") {
      output = await executePy(filepath, customInput);
    }

    return { filepath, output };
  } catch (error) {
    console.error(error);
    return { filepath: null, output: null };
  }
};

exports.compileCode = compileCode;
exports.compileCode1 = compileCode1;
