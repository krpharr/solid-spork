const inquirer = require('inquirer');
const chalkPipe = require('chalk-pipe');
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const employeeName = {
    type: "input",
    name: "name",
    message: "Name: "
}
const employeeID = {
    type: "input",
    name: "id",
    message: "Employee ID:"
}
const employeeEmail = {
    type: "input",
    name: "email",
    message: "Email address:"
}
const addAnother = {
    type: "confirm",
    name: "addAnother",
    message: "Add another team member?",
}

const manager = [];
const employeeArray = [];

async function setManager() {
    console.log(chalkPipe('red.bold')('Enter employee information for project manager.'));
    // console.log("Enter employee information for project manager.")
    // const mArray = [];
    let response = await inquirer
        .prompt([
            employeeName,
            employeeID,
            employeeEmail,
            {
                type: "input",
                name: "officeNumber",
                message: "Office Number: "
            }
        ]);
    let { name, id, email, officeNumber } = response;
    let manager = new Manager(name, id, email, officeNumber);
    // mArray.push(manager);
    return manager;
};

async function buildTeamArray() {
    let cont = true;
    const eArray = [];
    while (cont) {
        console.log(chalkPipe('red.bold')('Add a team member.'));
        let response = await inquirer
            .prompt([
                employeeName,
                employeeID,
                employeeEmail,
                {
                    type: "list",
                    name: "type",
                    message: "Engineer or Intern",
                    choices: ["Engineer", "Intern"],
                    filter: function(val) {
                        return val.toLowerCase();
                    }
                },
                {
                    type: "input",
                    name: "githubSchool",
                    message: "Github name: ",
                    when: function(answers) {
                        return answers.type === "engineer";
                    }
                },
                {
                    type: "input",
                    name: "githubSchool",
                    message: "Name of college: ",
                    when: function(answers) {
                        return answers.type === "intern";
                    }
                },
                addAnother
            ]);
        let { name, id, email, type, githubSchool } = response;
        let teamMember;
        if (type === 'engineer') {
            teamMember = new Engineer(name, id, email, githubSchool);
        } else {
            teamMember = new Intern(name, id, email, githubSchool);
        }
        eArray.push(teamMember);
        cont = response.addAnother;
    }
    return eArray;
};

setManager().then(res => {
    const teamArray = [];
    // const manager = res;
    // console.log(res);
    teamArray.push(res);
    buildTeamArray().then(res => {
        // console.log(res);
        teamArray.push(res);
        console.log(teamArray);
    });
});