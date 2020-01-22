const Manager = require("./Manager");
const Engineer = require("./Engineer");
const Intern = require("./Intern");

class BuildHtml {
    constructor(manager, teamArray, templateOBJ) {
        this.manager = manager;
        this.teamArray = teamArray.slice(0);
        this.mainHTML = templateOBJ.main;
        this.managerHTML = templateOBJ.manager;
        this.engineerHTML = templateOBJ.engineer;
        this.internHTML = templateOBJ.intern;
        this.output = this.buildMain();
    }

    getOutput() {
        return this.output;
    }

    buildMain() {
        let buffHTML = this.mainHTML.slice(0);
        let managerHTML = this.buildManager();
        let teamHTML = this.buildTeam();
        buffHTML = buffHTML.replace("MANAGER", "\n" + managerHTML);
        buffHTML = buffHTML.replace("TEAMMEMBERS", "\n" + teamHTML);
        return buffHTML;
    }

    buildManager() {
        let buff = this.managerHTML.slice(0);
        buff = buff.replace("NAME", this.manager.getName());
        buff = buff.replace(/IDNUMBER/g, this.manager.getId());
        buff = buff.replace("OFFICENUMBER", this.manager.getOfficeNumber());
        buff = buff.replace(/EMAIL/g, this.manager.getEmail());
        return buff;
    };

    buildTeamMamber(memberOBJ) {
        let buff;
        if (memberOBJ.getRole() === "Engineer") {
            buff = this.engineerHTML.slice(0);
            buff = buff.replace(/GITHUB/g, memberOBJ.getGithub());
        } else if (memberOBJ.getRole() === "Intern") {
            buff = this.internHTML.slice(0);
            buff = buff.replace("SCHOOL", memberOBJ.getSchool());
        }
        buff = buff.replace("NAME", memberOBJ.getName());
        buff = buff.replace(/IDNUMBER/g, memberOBJ.getId());
        buff = buff.replace(/EMAIL/g, memberOBJ.getEmail());
        return buff;
    }

    buildTeam() {
        let buffHTML = "";
        let engineersHTML = "";
        let internsHTML = "";
        this.teamArray.forEach(tm => {
            let buff = this.buildTeamMamber(tm) + "\n";
            if (tm.getRole() === "Engineer") {
                engineersHTML += buff;
            } else {
                internsHTML += buff;
            }
        });
        let engineers = `<div class="row" style="display: flex; flex-wrap: wrap; justify-content: left;">${engineersHTML}</div>`;
        let interns = `<div class="row" style="display: flex; flex-wrap: wrap; justify-content: left;">${internsHTML}</div>`;
        buffHTML = engineers + interns;
        return buffHTML;
    }
}

module.exports = BuildHtml;