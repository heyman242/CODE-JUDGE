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

const executeCpp = (filepath) => {
  const jobId = path.basename(filepath).split(".")[0];
  const outPath = path.join(outputsPath, `${jobId}.out`);

  return new Promise((resolve, reject) => {
    exec(
      `g++ ${filepath} -o ${outPath} && cd ${outputsPath} && ./${jobId}.out`,
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
  const { language = "cpp", code } = req.body;
  if (!code) {
    return res.status(400).json({ success: false, error: "Empty code body" });
  }

  try {
    const filepath = await generateFile(language, code);
    const output = await executeCpp(filepath);

    return res.status(200).json({ filepath, output });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
};

exports.compileCode = compileCode;
