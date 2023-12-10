const mongoose = require("mongoose");
const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: String, required: true },
});
const Project = mongoose.model("projects", projectSchema);

module.exports = Project;
