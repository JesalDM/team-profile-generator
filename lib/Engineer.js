// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");

// created sub-class Engineer as an extension of class Employee
class Engineer extends Employee {
    constructor(name, id, email, github){
        super(name, id, email);
        this.github = github;
    }
    // this method is specific to Engineer class
    getGithub(){
        return this.github;
    }
    // returns the role as Engineer
    getRole(){
        return "Engineer";
    }
}

module.exports = Engineer;
