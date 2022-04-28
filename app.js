
// To Start the App, just type node app.js and wait untill it finishes the calculations.

//Using third party I converted the .csv into JSON file for easy parsing.
const reactionsJsonData = require('./data/reactions.json');
const JobsJsonData = require('./data/jobs.json');

//Importing the functions that are asked in the Question Statement.
const {getSimilarityScores} = require('./task1Functions');
const getCompanySimilarityScore = require('./task2Functions');

getSimilarityScores(reactionsJsonData);
getCompanySimilarityScore(reactionsJsonData, JobsJsonData);
