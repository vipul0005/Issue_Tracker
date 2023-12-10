const express = require("express");
require("./database/config");
const Project = require("./database/project");
const Issue = require("./database/issue");
const bodyParser = require("body-parser");

const path = require("path");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname)));
app.use(express.urlencoded({ extended: true }));

app.get("/", async (request, response) => {
  try {
    const projects = await Project.find();

    response.render("Home", { projects });
  } catch (error) {
    // Handle errors appropriately
    console.error("Error fetching recent project:", error);
    response.status(500).send("Internal Server Error");
  }
});

app.get("/create-project", (request, response) => {
  response.render("CreateProject");
});

app.post("/create-project", (request, response) => {
  console.log("Reached /create route");
  const project = new Project(request.body);
  let result = project.save();

  response.redirect("/");
});

app.get("/about", (request, response) => {
  response.render("About");
});

app.get("/project-details/:id", async (request, response) => {
  try {
    const project = await Project.findOne({ _id: request.params.id });

    const projectId = request.params.id;
    const label = request.query.issueLabel;
    const author = request.query.issueAuthor;
    const searchQuery = request.query.searchQuery;

    let filterCriteria = { projectId: projectId };

    if (label) {
      filterCriteria.issueLabel = { $in: Array.isArray(label) ? label : [label] };
    }

    if (author) {
      filterCriteria.issueAuthor = author;
    }

    console.log(label, author, projectId, searchQuery);

    let issues =
      label || author
        ? await Issue.find(filterCriteria)
        : await Issue.find({ projectId: projectId });
    console.log("All Issues:", issues);

    if (searchQuery) {
      const escapedSearchQuery = searchQuery.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&");
      let searchRegex = new RegExp(escapedSearchQuery, "i");
      console.log(searchRegex.test("Example Issue"));
      issues = issues.filter(
        (individualIssue) =>
          searchRegex.test(individualIssue.issueTitle) ||
          searchRegex.test(individualIssue.issueDescription)
      );
      console.log(issues);
    }
    response.render("ProjectDetails", { project, issues });
  } catch (error) {
    console.error("Error fetching recent project:", error);
    response.status(500).send("Internal Server Error");
  }
});

app.get("/create-issue/:id", (request, response) => {
  const projectID = request.params.id;
  response.render("CreateIssue", { projectID });
});

app.post("/create-issue/:id", async (request, response) => {
  console.log("Reached /create issue post route");
  const issue = new Issue(request.body);

  try {
    const result = await issue.save();
    console.log(result);
    response.redirect(`/project-details/${request.params.id}`);
  } catch (error) {
    console.error("Error saving the issue:", error);
    response.status(500).send("Error saving the issue");
  }
});

app.get("/filter-issues", async (request, response) => {
  try {
    console.warn("Reached /filter-issues route");

    const label = request.query.issueLabel;
    const author = request.query.issueAuthor;
    const projectId = request.query.projectId;

    let filterCriteria = { projectId: projectId };

    if (label) {
      filterCriteria.issueLabel = { $in: Array.isArray(label) ? label : [label] };
    }

    if (author) {
      filterCriteria.issueAuthor = author;
    }
    const project = await Project.findOne({ _id: projectId });
    const filteredIssues = await Issue.find(filterCriteria);
    console.warn(filteredIssues);
    // response.json({ success: true, issues: filteredIssues });

    // Render or send the filtered issues as needed
    response.render("ProjectDetails", { project, issues: filteredIssues });
  } catch (error) {
    console.error("Error filtering issues:", error);
    response.status(500).send("Internal Server Error");
  }
});

app.get("/search-issues/:id", async (request, response) => {
  try {
    const projectId = request.params.id;
    const searchQuery = request.query.searchQuery;

    const filters = {
      projectId: projectId,
      $or: [
        { issueTitle: { $regex: searchQuery, $options: "i" } },
        { issueDescription: { $regex: searchQuery, $options: "i" } },
      ],
    };

    const issues = await Issue.find(filters);

    // Render the ProjectDetails page with the search results
    response.render("ProjectDetails", { project, issues });
  } catch (error) {
    console.error("Error searching issues:", error);
    response.status(500).send("Internal Server Error");
  }
});

app.listen(3001);
