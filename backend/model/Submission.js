const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SubmissionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  problemId: {
    type: Schema.Types.ObjectId,
    ref: 'Problem',
    required: true
  },
  language: {
    type: String,
    required: true,
    enum: ["cpp", "py"]
  },
  code: {
    type: String,
    required: true
  },
  filepath: {
    type: String,
    required: true
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  startedAt: {
    type: Date
  },
  output: {
    type: String
  },
  status: {
    type: String,
    default: 'pending',
    enum: ["pending", "Accepted", "error"]
  }
});

const Submission = mongoose.model('Submission', SubmissionSchema);

module.exports = Submission;
