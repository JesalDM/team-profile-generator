// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");

// created sub-class Intern as an extension of class Employee
class Intern extends Employee {
    constructor(name, id, email, school){
        super(name, id, email);
        this.school = school;
    }
    // this method is specific to Intern class
    getSchool(){
        return this.school;
    }
    // returns the role as Intern
    getRole(){
        return "Intern";
    }
}

module.exports = Intern;