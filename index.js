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

//Render html with user inputs
function renderHTML (position){
    const templateFile = fs.readFileSync(`./templates/${position.getRole().toLowerCase()}.html`,  { encoding: 'utf8' });
    let temporaryFile = templateFile.replace('{{ name }}', position.name);
    temporaryFile = temporaryFile.replace('{{ role }}', position.getRole());
    temporaryFile = temporaryFile.replace('{{ id }}', position.id);
    temporaryFile = temporaryFile.replace('{{ email }}', position.email);
    temporaryFile = temporaryFile.replace('{{ email }}', position.email);


    if(position.getRole().toLowerCase()==="engineer"){
        temporaryFile = temporaryFile.replace('{{ github }}', position.github);
        temporaryFile = temporaryFile.replace('{{ github }}', position.github);
      }else if(position.getRole().toLowerCase()==="intern"){
        temporaryFile = temporaryFile.replace('{{ school }}', position.school);
      }else if(position.getRole().toLowerCase()==="manager"){
        temporaryFile = temporaryFile.replace('{{ officeNumber }}', position.officeNumber);
    } return temporaryFile;
}

async function AddorStop (proceed,chosenMember,team, templateMainFile) {
  try {
    do{
      switch(chosenMember){
        case "engineer":
        const engineer = await inquirer.prompt(engineerQs);
        console.log(engineer);
        
        let engineerNew = new Engineer(engineer.name , engineer.id, engineer.email,engineer.github);
        let engineerCard = renderHTML(engineerNew);
        team = team + engineerCard
        console.log(team);
        let nextMove = await inquirer.prompt(addMore);
        console.log(nextMove);
        
        if(nextMove.choice[0]==="false"){
            proceed = false;
            console.log(proceed,"THIS IS PROCEED STATUS");
            let mainTemplate = templateMainFile.replace('{{ team }}', team);
            fs.writeFileSync("index.html",mainTemplate);
        } else if (nextMove.choice[0]==="true"){
          const newMember = await inquirer.prompt(typeOfMember);
          chosenMember = newMember.member1[0];
        }
        break;  
        case "intern":
        const intern = await inquirer.prompt(internQs);
          let internNew = new Intern(intern.name , intern.id, intern.email,intern.school);
          let internCard = renderHTML(internNew);
          team = team + internCard
          console.log(team);
        let nextMove1 = await inquirer.prompt(addMore);
         
            if(nextMove1.choice[0]==="false"){
              proceed = false;
              let tempMain = templateMainFile.replace('{{ team }}', team);
              fs.writeFileSync("index.html",tempMain);
            } else if (nextMove1.choice[0]==="true"){
              const newMember1 = await inquirer.prompt(memberType);
              chosenMember = newMember1.member1[0];
            }
        break;
      }
    }while(proceed)
  } catch (err) {
  }
}
