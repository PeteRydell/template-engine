//File requirements
const Employee = require("./Employee");

//Engineer contructor extending on employee
class Engineer extends Employee {
    constructor (name,id,email,github){
        super(name,id,email);
        this.github = github;
    }
    getRole(){
        return "Engineer";
    }
    getGithub (){
        return this.github;
    }
}

module.exports = Engineer;