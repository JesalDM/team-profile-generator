const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");



// array of questions prompted to the user
const questions = [
    {
        type: "input",
        name: "name",
        message: "What is the name of the employee?",
        validate: answer => {
            if (answer === ""){
                return "Name is required";
            } 
            return true;
        }
    },
    {
        type: "number",
        name: "id",
        message: "What is the id of the employee?",
        validate: (answer) => {
            if (answer === ""){
              return "Please enter a number greater than 0";
            }
              return true;
        },
        filter: answer => {
            if(Number.isNaN(answer) || Number(answer)<=0){
                return ""
            }
            return Number(answer);
        }     
    },
    {
        type: "input",
        name: "email",
        message: "What is the email address of the employee?",
        validate: (answer)=> {
            if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(answer))){
                return "Please enter a valid email address";
            }
            return true;
        }
    },
    {
        type: "list",
        name: "employeeType",
        message: "What is the role of the employee?",
        choices: ['Manager', 'Engineer', 'Intern']
    },
    {
        type: "number",
        name: "officeNumber",
        message: "What is the office number of the Manager?",
        when: (answers) => answers.employeeType === 'Manager',
        validate: (answer) => {
            if (answer === ""){
              return "Please enter a valid 10-digit number";
            }
              return true;
        },
        filter: answer => {
            if(!((/^\d{10}$/).test(answer))){
                return ""
            }
            return Number(answer);
        }     
    },
    {
        type: "input",
        name: "github",
        message: "What is the github username of the Engineer?",
        when: (answers) => answers.employeeType === 'Engineer',
        validate: answer => {
            if (answer === ""){
                return "Github username is required";
            } 
            return true;
        }
    },
    {
        type: "input",
        name: "school",
        message: "What is the name of the intern's school?",
        when: (answers) => answers.employeeType === 'Intern',
        validate: answer => {
            if (answer === ""){
                return "School name is required";
            } 
            return true;
        }
    }
];


//function to initialize program
function init() {
    inquirer
    .prompt([
        {
            type: "number",
            name: "teamSize",
            message: "What is the size of your team?"
        }
    ])
    .then((response) => {
        const team = [];  
        const askQuestions = () => {
        //using inquirer.prompt() method
            inquirer
            .prompt(questions)
            .then((answers)=>{
                switch(answers.employeeType){
                    case "Manager":
                        const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
                        team.push(manager);
                        break;
                    case "Engineer":
                        const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
                        team.push(engineer);
                        break;
                    case "Intern":
                        const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
                        team.push(intern);
                        break;
                    }
                if (team.length < response.teamSize){
                    askQuestions();  
                } else {
                    const renderTeamProfile = render(team);
                    if (!fs.existsSync(OUTPUT_DIR)){
                        fs.mkdirSync(OUTPUT_DIR);
                    }
                    fs.writeFile(outputPath, renderTeamProfile, (err) =>
                     err ? console.error(err) : console.log('Success!')
                    );
                }
            });
        }
        askQuestions();
    });
};

// function call to initialize program
init();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
