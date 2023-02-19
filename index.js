const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);


function validateInput(value) {
    if (value != "") {
        return true;
    } else {
        return "Please answer the question!";
    }
}


// License function and  if/else section here 
function getLicense(value) {
    if (value === "GNU AGPLv3") {
        return "[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)";
    } else if (value === "GNU GPLv3") {
        return "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)";
    } else if (value === "GNU LGPLv3") {
        return "[![License: LGPL v3](https://img.shields.io/badge/License-LGPL%20v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)";
    } else if (value === "Apache 2.0") {
        return "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
    } else if (value === "Boost Software 1.0") {
        return "[![License](https://img.shields.io/badge/License-Boost%201.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)";
    } else if (value === "MIT") {
        return "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
    } else {
        return "[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)";
    }
}

const promptUser = () =>
  inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is your title of the project?',
    },
    // {
    //   type: 'input',
    //   name: 'description',
    //   message: 'What is description of the project?',
        // validate: validateInput,
    // },
    // {
    //   type: 'input',
    //   name: 'installation',
    //   message: 'Waht are Installation requirements of the project?',
    // },
    // {
    //   type: 'input',
    //   name: 'usage',
    //   message: 'What is usage of project?',
    // },
    // {
    //   type: 'input',
    //   name: 'license',
    //   message: 'Enter your License.',
    // },
    {
        type: "list",
        name: "license",
        message: "Please select a license for this project.",
        choices: [
            "GNU AGPLv3",
            "GNU GPLv3",
            "GNU LGPLv3",
            "Apache 2.0",
            "Boost Software 1.0",
            "MIT",
            "Mozilla",
        ],
        validate: validateInput,
    },
    // {
    //     type: 'input',
    //     name: 'contributing',
    //     message: 'Would you like other developers to contribute on it, Enter details.',
    //   },
    //   {
    //     type: 'input',
    //     name: 'tests',
    //     message: 'How to run tests?.',
    //   },
    //   {
    //     type: 'input',
    //     name: 'githubName',
    //     message: 'Enter your gitHub username?',
    //   },
    //   {
    //     type: 'input',
    //     name: 'email',
    //     message: 'Please enter your email.',
    //   },
  ]);

// let badge = getLicense(answers.choices);
// let badgeLogo = "<p>${}</p>";

const generateMarkdown = (answers) =>
`# ${answers.title}   
${getLicense(answers.choices)}
## Description
${answers.description}
## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [Credits](#credits)
* [License](#license)
* [Contributing](#contributing)
* [Tests](#tests)
* [Questions](#questions)

## Installation
${answers.installation}

## Usage
${answers.usage}

### View output video

## Credits

## License
Copyright (c) 2023 ${getLicense(answers.choices)}.


## Contributing
${answers.contributing}

## Tests
${answers.tests}

## Questions
[${answers.githubName}](https://github.com/${answers.githubName})   
If you have any question please reach me out at ${answers.email}`;

promptUser()
  .then((answers) => writeFileAsync('README.md', generateMarkdown(answers)))
  .then(() => console.log('Successfully wrote to readme file'))
  .catch((err) => console.error(err));
