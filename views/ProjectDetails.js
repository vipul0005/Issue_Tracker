// Show all issues //

function toggleAllIssues() {
  // Get the issues container by ID
  const issuesContainer = document.getElementById("all-issues-container");

  // Toggle the visibility of the issues container
  if (issuesContainer.style.display === "none") {
    issuesContainer.style.display = "block";
    document.getElementById("showIssueBtn").innerText = "Hide  Issues";
  } else {
    issuesContainer.style.display = "none";
    document.getElementById("showIssueBtn").innerText = "Show  Issues";
  }
}
