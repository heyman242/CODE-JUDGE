const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const problemSchema = new Schema({
  problemName: {
    type: String,
    required: true,
    unique:true,
  },
  problemStatement: {
    type: String,
    required: true,
  },
  sampleInputs: {
    type: [String],
    required: true,
  },
  sampleOutputs: {
    type: [String],
    required: true,
  },
  level: {
    type: String,
    enum: ["easy", "medium", "hard"],
    required: true,
  },
});

module.exports = mongoose.model("Problem", problemSchema);
