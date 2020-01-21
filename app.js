const inquirer = require('inquirer');
const chalkPipe = require('chalk-pipe');
const util = require("util");
const fs = require("fs");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const BuildHtml = require("./lib/BuildHtml");

const readFileAysnc = util.promisify(fs.readFile);

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

loadTemplates().then(res => {
    console.log(res);
    // let { main, manager, engineer, intern } = res;
    // let tOBJ = {
    //     main: main,
    //     manager: manager,
    //     engineer: engineer,
    //     inter: intern
    // };
    const myManager = new Manager("Randall", 12, "ranpharr@verizon.net", 1412);
    console.log(myManager);
    let buildhtml = new BuildHtml(myManager, [1, 2, 3, 4], res);

    console.log(buildhtml.output);

    fs.writeFile("output/team.html", buildhtml.output, function(err) {
        if (err) {
            console.log(err);
        }
    });
});


// const myManager = new Manager("Randall", 12, "ranpharr@verizon.net", 1412);
// console.log(myManager);
// let buildhtml = new BuildHtml(myManager, [1, 2, 3, 4], templateOBJ);

// console.log(buildhtml.output);

// let interval = setInterval(function() {
//     if (buildhtml.loaded) {
//         let output = buildhtml.getOutput();
//         console.log(output);
//         clearInterval(interval);
//         // write output to file
//     }
// }, 10);

/////////////////////////////////////////
//
/////////////////////////////////////////
// setManager().then(res => {
//     const teamArray = [];
//     teamArray.push(res);
//     buildTeamArray().then(res => {
//         teamArray.push(res);
//         console.log(teamArray);
//     });
// });