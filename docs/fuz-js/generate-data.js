const fs = require('fs');
const { getFakePersonName } = require('./util');

const skillRange = 10;

const generateEmail = (name) => {
  const [first, last] = name.split(' ');
  return `${first.slice(0, 1)[0].toLowerCase()}${last.toLowerCase()}@ztech.io`;
}

const generateFakeNames = (limit = 48) => {

  const data = new Array(limit)
    .fill()
    .map(() => {
      const name = getFakePersonName();
      const email = generateEmail(name);
      const skill = Math.ceil(skillRange * Math.random());
      return {
        name, email, skill,
      }
    });

  fs.writeFile('data.json', JSON.stringify(data, null, 2), (err, data) => {
    if (err) {
      console.log(`Something went wrong! ${err}`)
    }
    console.log(`Names generated!`)
  });
}

generateFakeNames(48);