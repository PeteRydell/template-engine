//File requirements
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

const engineerQs = [
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

const internQs = [
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

const addMore = [
  {
    type: "checkbox",
    message: "Add more members?",
    name: "choice",
    choices: ["true","false"]
  }
]

const memberType = [
  {
    type: "checkbox",
    message: "What type of team member would you like to add?",
    name: "member1", 
    choices: ["engineer","intern"]  
  }
]

//Inquirer prompt
inquirer
  .prompt(questions)
  .then(function(user) {
    const templateMainFile = fs.readFileSync(`./templates/main.html`,  { encoding: 'utf8' });

    //First option is manager
    const manager = new Manager (user.name , user.id , user.email , user.officeNumber);

    let team = renderHTML(manager);
    let proceed = true;
    //adding team member to main template file
    AddorStop(proceed,user.member[0],team,templateMainFile);
});
