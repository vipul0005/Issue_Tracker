# Issue Tracker App

This is a simple Node.js and EJS application for tracking issues/bugs related to projects.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)

## Features

- Build a neat UI
  - Home Page
    - Show a list of projects.
    - Button to create a new project.
  - Create Project Page
    - Accept fields to create a project (Name, Description, Author).
  - Project Detail Page
    - Display issues related to the selected project.
    - Filter issues by multiple labels.
    - Filter issues by author.
    - Search issues by title and description.
    - Button to create a new issue.
  - Create Issue Page
    - Create a new issue for a project.
    - Accept fields: Title, Description, Labels, Author.

## Installation

1. Clone the repository:
   git clone https://github.com/vipul0005/issue-tracker.git
   cd issue-tracker

2. Install dependencies:
   npm install

3. Set up your MongoDB database and update the database configuration in
   ./database/config.js

4. Run the application:
   node index.js

## Usage

1. Access the application at [http://localhost:3001](http://localhost:3001).
2. Explore the home page, create new projects, and navigate to project detail pages.
3. Filter, search, and create issues as needed.
4. Enjoy managing your project issues with ease!

## Dependencies

- **Express**: Fast, unopinionated, minimalist web framework for Node.js.
- **EJS**: Embedded JavaScript templating.
- **MongoDB**: NoSQL database for data storage.
- **Mongoose**: MongoDB object modeling for Node.js.
- **Bootstrap**: Front-end framework for styling.

## Contributing

Contributions are welcome! Please follow the Contribution Guidelines.

### Folder Structure

`````
Issue_Tracker
│
├── database/
│   ├── config.js
│   ├── issue.js
│    project.js
│
│
├──node_modules
│
├── views/
│   ├── common/
│   │   ├── Footer.ejs
│   │   └── Nav.ejs
│   ├── CreateIssue.ejs
│   ├── CreateProject.ejs
│   ├── Home.ejs
│   └── ProjectDetails.ejs
│
├── index.js
├── package-lock.json
├── package.json
└── README.md
    ````
`````
