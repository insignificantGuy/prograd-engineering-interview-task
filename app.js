const reactionsJsonData = require('./data/reactions.json');
const JobsJsonData = require('./data/jobs.json');

const {getSimilarityScores} = require('./task1Functions');
const getCompanySimilarityScore = require('./task2Functions');

getSimilarityScores(reactionsJsonData);
getCompanySimilarityScore(reactionsJsonData, JobsJsonData);