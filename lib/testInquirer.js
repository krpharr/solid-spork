const inquirer = require("inquirer");

inquirer
    .prompt([{
        type: 'checkbox',
        message: 'Select toppings',
        name: 'toppings',
        choices: [
            new inquirer.Separator(' = The Meats = '),
            {
                name: 'Pepperoni'
            },
            {
                name: 'Ham'
            },
            {
                name: 'Ground Meat'
            },
            {
                name: 'Bacon'
            },
            new inquirer.Separator(' = The Cheeses = '),
            {
                name: 'Mozzarella',
                checked: true
            },
            {
                name: 'Cheddar'
            },
            {
                name: 'Parmesan'
            },
            new inquirer.Separator(' = The usual ='),
            {
                name: 'Mushroom'
            },
            {
                name: 'Tomato'
            },
            new inquirer.Separator(' = The extras = '),
            {
                name: 'Pineapple'
            },
            {
                name: 'Olives',
                disabled: 'out of stock'
            },
            {
                name: 'Extra cheese'
            }
        ],
        validate: function(answer) {
            if (answer.length < 1) {
                return 'You must choose at least one topping.';
            }

            return true;
        }
    }])
    .then(answers => {
        console.log(JSON.stringify(answers, null, '  '));
    });


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