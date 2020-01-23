const inquirer = require("inquirer");
const chalkPipe = require("chalk-pipe");
const util = require("util");
const fs = require("fs");
const validator = require("validator");
const format = require("html-format");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const BuildHtml = require("./lib/BuildHtml");

const readFileAysnc = util.promisify(fs.readFile);

const idArray = [];

const employeeName = {
    type: "input",
    name: "name",
    message: "Name: ",
    validate: function(value) {
        if (validator.isEmpty(value)) return "Name can not be empty.";
        return true;
    }
}
const employeeID = {
    type: "input",
    name: "id",
    message: "Employee ID:",
    validate: function(value) {
        if (validator.isEmpty(value)) return "ID can not be empty.";
        if (value.toString().length < 2 || value.toString().length > 6) return "ID must be 2 to six characters."
        if (idArray.includes(value)) return "ID Taken. Choose unique id for employee.";
        idArray.push(value);
        return true;
    }
}
const employeeEmail = {
    type: "input",
    name: "email",
    message: "Email address:",
    validate: function(value) {
        if (validator.isEmpty(value)) return "Email can not be empty.";
        let pass = validator.isEmail(value);
        if (pass) return pass;
        return "Enter a valid email addess."
    }
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
    let response = await inquirer
        .prompt([
            employeeName,
            employeeID,
            employeeEmail,
            {
                type: "input",
                name: "officeNumber",
                message: "Office Number: ",
                validate: function(value) {
                    if (validator.isEmpty(value)) return "Offide number can not be empty.";
                    return true;
                }
            }
        ]);
    let { name, id, email, officeNumber } = response;
    let manager = new Manager(name, id, email, officeNumber);
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
                    },
                    validate: function(value) {
                        if (validator.isEmpty(value)) return "Github name can not be empty.";
                        return true;
                    }
                },
                {
                    type: "input",
                    name: "githubSchool",
                    message: "Name of school: ",
                    when: function(answers) {
                        return answers.type === "intern";
                    },
                    validate: function(value) {
                        if (validator.isEmpty(value)) return "School name can not be empty.";
                        return true;
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

async function loadTemplates() {
    let [main, manager, engineer, intern] = await Promise.all([readFileAysnc("templates/main.html", "utf8"),
        readFileAysnc("templates/manager.html", "utf8"),
        readFileAysnc("templates/engineer.html", "utf8"),
        readFileAysnc("templates/intern.html", "utf8")
    ]);
    let buffObj = {
        main: main,
        manager: manager,
        engineer: engineer,
        intern: intern
    }
    return buffObj;
};

setManager().then(res => {
    const manager = res;
    buildTeamArray().then(res => {
        const teamArray = res.slice(0);
        loadTemplates().then(res => {
            let buildhtml = new BuildHtml(manager, teamArray, res);
            fs.writeFile("output/team.html", format(buildhtml.output), function(err) {
                if (err) {
                    console.log(err);
                }
            });
        });
    });
});