const inquirer = require("inquirer");

var directionsPrompt = {
    type: 'list',
    name: 'direction',
    message: 'Which direction would you like to go?',
    choices: ['Forward', 'Right', 'Left', 'Back']
};

function main() {
    console.log('You find youself in a small room, there is a door in front of you.');
    exitHouse();
}

function exitHouse() {
    inquirer.prompt(directionsPrompt).then(answers => {
        if (answers.direction === 'Forward') {
            console.log('You find yourself in a forest');
            console.log(
                'There is a wolf in front of you; a friendly looking dwarf to the right and an impasse to the left.'
            );
            encounter1();
        } else {
            console.log('You cannot go that way. Try again');
            exitHouse();
        }
    });
}

function encounter1() {
    inquirer.prompt(directionsPrompt).then(answers => {
        var direction = answers.direction;
        if (direction === 'Forward') {
            console.log('You attempt to fight the wolf');
            console.log(
                'Theres a stick and some stones lying around you could use as a weapon'
            );
            encounter2b();
        } else if (direction === 'Right') {
            console.log('You befriend the dwarf');
            console.log('He helps you kill the wolf. You can now move forward');
            encounter2a();
        } else {
            console.log('You cannot go that way');
            encounter1();
        }
    });
}

function encounter2a() {
    inquirer.prompt(directionsPrompt).then(answers => {
        var direction = answers.direction;
        if (direction === 'Forward') {
            var output = 'You find a painted wooden sign that says:';
            output += ' \n';
            output += ' ____  _____  ____  _____ \n';
            output += '(_  _)(  _  )(  _ \\(  _  ) \n';
            output += '  )(   )(_)(  )(_) ))(_)(  \n';
            output += ' (__) (_____)(____/(_____) \n';
            console.log(output);
        } else {
            console.log('You cannot go that way');
            encounter2a();
        }
    });
}

function encounter2b() {
    inquirer
        .prompt({
            type: 'list',
            name: 'weapon',
            message: 'Pick one',
            choices: [
                'Use the stick',
                'Grab a large rock',
                'Try and make a run for it',
                'Attack the wolf unarmed'
            ]
        })
        .then(() => {
            console.log('The wolf mauls you. You die. The end.');
        });
}

main();

// var questions = [{
//         type: 'confirm',
//         name: 'bacon',
//         message: 'Do you like bacon?'
//     },
//     {
//         type: 'input',
//         name: 'favorite',
//         message: 'Bacon lover, what is your favorite type of bacon?',
//         when: function(answers) {
//             return answers.bacon;
//         }
//     },
//     {
//         type: 'confirm',
//         name: 'pizza',
//         message: 'Ok... Do you like pizza?',
//         when: function(answers) {
//             return !likesFood('bacon')(answers);
//         }
//     },
//     {
//         type: 'input',
//         name: 'favorite',
//         message: 'Whew! What is your favorite type of pizza?',
//         when: likesFood('pizza')
//     }
// ];

// function likesFood(aFood) {
//     return function(answers) {
//         return answers[aFood];
//     };
// }

// inquirer.prompt(questions).then(answers => {
//     console.log(JSON.stringify(answers, null, '  '));
// });