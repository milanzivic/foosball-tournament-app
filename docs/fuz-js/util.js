const { uniqueNamesGenerator, names, adjectives, colors, animals } = require('unique-names-generator');



const logme = (...data) => {
  const logData = data.map(item => JSON.stringify(item, null, 2) + '\n');
  console.log(...logData);
}

const getFakePersonName = () => uniqueNamesGenerator({
  dictionaries: [adjectives, names],
  length: 2,
  separator: ' ',
  style: 'capital'
});

const getFakeTeamName = () => uniqueNamesGenerator({
  dictionaries: [colors, animals],
  length: 2,
  separator: ' ',
  style: 'capital'
});

module.exports = {
  logme,
  getFakePersonName,
  getFakeTeamName,
}