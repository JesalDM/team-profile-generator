// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee");

// created sub-class Manager as an extension of class Employee
class Manager extends Employee {
    constructor(name, id, email, officeNumber){
        super(name, id, email);
        this.officeNumber = officeNumber;
    }
      // this method is specific to Manager class
    getOfficeNumber(){
        return this.officeNumber;
    }
    // returns the role as Manager
    getRole(){
        return "Manager";
    }
}

module.exports = Manager;