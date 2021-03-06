const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employeeList = [];

// ask user manager info

function askUserForManagerInfo() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is your manager's name?",
            name: "name",
        },
        {
            type: "input",
            message: "What is your manager's id?",
            name: "id",
        },
        {
            type: "input",
            message: "What is your manager's email?",
            name: "email",
        },
        {
            type: "input",
            message: "What is your manager's office number?",
            name: "officenumber",
        },


        // returns resolution of the prommise, accept the response
    ]).then((managerData) => {
        const newManager = new Manager(managerData.name, managerData.id, managerData.email, managerData.officenumber);

        employeeList.push(newManager);
        askUserForEmployeeType()
    });

}
// ask user for next employee type

function askUserForEmployeeType() {
    return inquirer.prompt([
        {
            type: "list",
            message: "What type of team memeber would you like to add?",
            name: "member",
            choices:["Engineer", "Intern", "Manager", "None"]
        },

        // returns resolution of the prommise, accept the response
    ]).then((newEmployeeChoiceData) => {
        // If user selects a new Engineer
       
            
            if (newEmployeeChoiceData.member === 'Engineer') {
                console.log(newEmployeeChoiceData);
                askUserForEngineerInfo();
            
        }
        // else if the user selects new intern
        
            if (newEmployeeChoiceData.member === 'Intern') {

                askUserForInternInfo();
                console.log(newEmployeeChoiceData);
                
            }
        

        //else 
        
            if (newEmployeeChoiceData.member === 'None') {

                createHtmlFile();
                console.log(newEmployeeChoiceData);
                
            };

        });
    }

//ask user for engineer info

function askUserForEngineerInfo() {
    return inquirer.prompt([
        {
            type: "input",
            message: "What is your engineer's name?",
            name: "name",
        },
        {
            type: "input",
            message: "What is your engineer's id?",
            name: "id",
        },
        {
            type: "input",
            message: "What is your engineer's email?",
            name: "email",
        },
        {
            type: "input",
            message: "What is your engineer's GitHub username?",
            name: "GitHub",
        },


        // returns resolution of the prommise, accept the response
    ]).then((engineerData) => {
        const newEngineer = new Engineer(engineerData.name, engineerData.id, engineerData.email, engineerData.GitHub);

        employeeList.push(newEngineer);
        askUserForEmployeeType()

    });
}

//ask user for intern info
function askUserForInternInfo() {
    return inquirer.prompt([
        {
            type: "input",
            message: "What is your intern's name?",
            name: "name",
        },
        {
            type: "input",
            message: "What is your intern's id?",
            name: "id",
        },
        {
            type: "input",
            message: "What is your intern's email?",
            name: "email",
        },
        {
            type: "input",
            message: "What is your intern's school?",
            name: "school",
        },



        // returns resolution of the prommise, accept the response
    ]).then((internData) => {
        const newIntern = new Intern(internData.name, internData.id, internData.email, internData.school);

        employeeList.push(newIntern);
        askUserForEmployeeType()

    });
}

function createHtmlFile() {

    const htmlContent = render(employeeList);
    // use FS module to create the output file
    fs.writeFile(outputPath, htmlContent, (err) => {
        if (err) throw err;
        console.log(employeeList);
    })
}

askUserForManagerInfo();



  // generateFile();

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
