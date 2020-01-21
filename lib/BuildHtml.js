const Manager = require("./Manager");
const Engineer = require("./Engineer");
const Intern = require("./Intern");



class BuildHtml {
    constructor(manager, teamArray, templateOBJ) {
        this.manager = manager;
        this.teamArray = teamArray;
        // this.loaded = false;
        // this.loadTemplates().then(res => {
        this.mainHTML = templateOBJ.main;
        this.managerHTML = templateOBJ.manager;
        this.engineerHTML = templateOBJ.engineer;
        this.internHTML = templateOBJ.intern;
        this.output = this.buildMain();
        // this.loaded = true;
        // });
    }

    getOutput() {
        return this.output;
    }

    // async loadTemplates() {
    //     try {
    //         let [main, manager, engineer, intern] = await Promise.all([readFileAysnc("../templates/main.html", "utf8"),
    //             readFileAysnc("../templates/manager.html", "utf8"),
    //             readFileAysnc("../templates/engineer.html", "utf8"),
    //             readFileAysnc("../templates/intern.html", "utf8")
    //         ]);
    //         let buffObj = {
    //             main: main,
    //             manager: manager,
    //             engineer: engineer,
    //             intern: intern
    //         }
    //         return buffObj;
    //     } catch (err) {
    //         console.log(err);
    //     }

    // }
    buildMain() {
        let buffHTML = this.mainHTML.slice(0);
        let managerHTML = this.buildManager();
        buffHTML = buffHTML.replace("MANAGER", managerHTML);

        //add team members


        return buffHTML;
    }
    buildManager() {
        let buff = this.managerHTML.slice(0);
        buff = buff.replace("NAME", this.manager.name);
        buff = buff.replace("ID", this.manager.id);
        buff = buff.replace("OFFICENUMBER", this.manager.officeNumber);
        buff = buff.replace(/EMAIL/g, this.manager.email);
        return buff;
    };

}

module.exports = BuildHtml;



// async function loadTemplates() {
//     let [main, manager, engineer, intern] = await Promise.all([readFileAysnc("../templates/main.html", "utf8"),
//         readFileAysnc("../templates/manager.html", "utf8"),
//         readFileAysnc("../templates/engineer.html", "utf8"),
//         readFileAysnc("../templates/intern.html", "utf8")
//     ]);

//     console.log(mainHTML, managerHTML);

//     let buffObj = {
//         main: main,
//         manager: manager,
//         engineer: engineer,
//         intern: inter
//     }
//     return buffObj;
// };


// loadHTML().then(res => {
//     console.log(res);
// });