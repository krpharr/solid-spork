var inquirer = require('inquirer');



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
    message: "Add another employee?",

}

const manager = [];
const employeeArray = [];

async function setManager() {
    console.log("Enter employee information for project manager.")
    const mArray = [];
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
    mArray.push(response);
    return mArray;
};

async function buildTeamArray() {
    let cont = true;
    const eArray = [];
    while (cont) {
        let response = await inquirer
            .prompt([
                employeeName,
                employeeID,
                employeeEmail,
                {
                    type: "list",
                    name: "type",
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
        let employee = {
            name: name,
            id: id,
            email: email,
            type: type,
            githubSchool: githubSchool
        }
        eArray.push(employee);
        cont = response.addAnother;
    }
    return eArray;
};

function likesFood(aFood) {
    return function(answers) {
        return answers[aFood];
    };
}


setManager().then(res => {
    console.log(res);
    buildTeamArray().then(res => {
        console.log(res);
    });
});