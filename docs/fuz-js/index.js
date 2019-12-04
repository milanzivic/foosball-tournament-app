const fs = require('fs');
const _ = require('lodash');
const { logme, getFakeTeamName } = require('./util');

const readFile = async (path = 'data.json') => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, buffer) => {
      if (err) {
        reject(err);
      }

      const data = JSON.parse(buffer.toString());
      data.sort((a, b) => a.skill - b.skill);
      resolve(data);
    });
  });
}

const splitToBuckets = (data, numOfBuckets = 4) => {
  if (!Number.isInteger(Math.log2(numOfBuckets))) {
    throw new Error('The number of buckets is not the exponent of 2');
  }
  const bucketSize = data.length / numOfBuckets;
  return _.chunk(data, bucketSize);
}

const createTeamsFromBuckets = (buckets, shuffle = true) => {
  const lowerBuckets = buckets.slice(0, buckets.length / 2);

  const allTeams = lowerBuckets.map((lower, lowerIndex) => {
    // Get the corresponding upper bucket:
    const upper = buckets[buckets.length - lowerIndex - 1];
    const leftShuffle = _.shuffle(lower);
    const rightShuffle = _.shuffle(upper);

    const section = leftShuffle.map((playerOne, index) => {
      const playerTwo = rightShuffle[index];
      const teamName = getFakeTeamName();
      return { teamName, playerOne, playerTwo };
    });
    return section;
  });

  const response = shuffle ? _.shuffle(allTeams) : allTeams;
  return _.flatten(response);
}

const createFuzzTeams = async () => {
  const data = await readFile();
  const buckets = splitToBuckets(data);
  const teams = createTeamsFromBuckets(buckets);
  logme(teams);
  fs.writeFile('output.json', JSON.stringify(teams, null, 2));
}

createFuzzTeams();