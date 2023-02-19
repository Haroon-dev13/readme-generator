const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);

const promptUser = () =>
  inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is your title of the project?',
    },
    {
      type: 'input',
      name: 'description',
      message: 'What is description of the project?',
    },
    {
      type: 'input',
      name: 'installation',
      message: 'Waht are Installation requirements of the project?',
    },
    {
      type: 'input',
      name: 'usage',
      message: 'What is usage of project?',
    },
    // {
    //   type: 'input',
    //   name: 'license',
    //   message: 'Enter your License.',
    // },
    {
        type: 'input',
        name: 'contributing',
        message: 'Would you like other developers to contribute on it, Enter details.',
      },
      {
        type: 'input',
        name: 'tests',
        message: 'How to run tests?.',
      },
      {
        type: 'input',
        name: 'githubName',
        message: 'Enter your gitHub username?',
      },
  ]);

const generateMarkdown = (answers) =>
`# ${answers.title}
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

## Contributing
${answers.contributing}

## Tests
${answers.tests}

## Questions
${answers.questions}`;

promptUser()
  .then((answers) => writeFileAsync('README.md', generateMarkdown(answers)))
//   writeFileAsync('ExampleREADME.md', markdown);

  .then(() => console.log('Successfully wrote to readme file'))
  .catch((err) => console.error(err));
