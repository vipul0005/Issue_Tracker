const mongoose = require("mongoose");
const issueSchema = new mongoose.Schema({
  projectId: { type: String, required: true },
  issueTitle: { type: String, required: true },
  issueDescription: { type: String, required: true },
  issueLabel: { type: [String], required: true },
  issueAuthor: { type: String, required: true },
});
const Issue = mongoose.model("issues", issueSchema);

module.exports = Issue;
