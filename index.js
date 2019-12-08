const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Employee = require("./lib/Employee");
const inquirer = require("inquirer");
const fs = require("fs");

const questions = [
  {
    type: "input",
    name: "name",
    message: "What is the manager's name?"
  },
  {
    type: "input",
    message: "What the manager's employee id?",
    name: "id",
  },
  {
    type: "input",
    message: "What is the manger's email?",
    name: "email", 
  },
  {
    type: "input",
    message: "What is the manger's office number?",
    name: "officeNumber", 
  },
  {
    type: "checkbox",
    message: "What type of team member would you like to add?",
    name: "member", 
    choices: ["engineer","intern"]
  }
];

const engineerQuestions = [
  {
    type: "input",
    name: "name",
    message: "What is the employee's name?"
  },
  {
    type: "input",
    message: "What is the employee id?",
    name: "id",
  },
  {
    type: "input",
    message: "What is the employee's email?",
    name: "email", 
  },
  {
    type: "input",
    message: "What is the employee's github username?",
    name: "github", 
  }
];

const internQuestions = [
  {
    type: "input",
    name: "name",
    message: "What is the employee's name?"
  },
  {
    type: "input",
    message: "What is the employee id?",
    name: "id",
  },
  {
    type: "input",
    message: "What is the employee's email?",
    name: "email", 
  },
  {
    type: "input",
    message: "Where does the employee attend school?",
    name: "school", 
  }
];

const continueOrEnd = [
  {
    type: "checkbox",
    message: "Add more members?",
    name: "choice",
    choices: ["true","false"]
  }
]

const typeOfMember = [
  {
    type: "checkbox",
    message: "What type of team member would you like to add?",
    name: "member1", 
    choices: ["engineer","intern"]  
  }
]
