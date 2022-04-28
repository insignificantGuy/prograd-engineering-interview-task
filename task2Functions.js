const {UserLikedJobs} = require('./task1Functions'); 
const {getAllNumberOfMatches} = require('./task1Functions');

// ----------------------------------------------------------------------
/*
Algorithm Explanation of Task 2

This one was a little bit difficult and I have to think really hard on it.
1. The first step was to segregate the companies based on the jobs. Like a company could have several job, so I segreagated them using
getCompaniesByJobs function.

2. Now as per question we need to find out user who have liked at least one job of a company. So I looped over
All User who liked jobs obj and All companies and their job object. I looped over the kept a constant array of object where I stored the company_id
and the people who have liked jobs at those companies.

3. Now we have data of company, poeple who liked jobs at those company. Now simply I looped over the object array 
and kept a count of maximumSimilarityScore and companies have these similarity Score. Finally I printed them.

*/
//-----------------------------------------------------------------------

// Function to get All companies based on jobs
function getCompaniesByJobs(jobsJsonData){
    var companiesByJobs = {};
    jobsJsonData.forEach((element) => {
        if(companiesByJobs[element.company_id]){
            companiesByJobs[element.company_id].push(element.job_id);
        }
        else{
            companiesByJobs[element.company_id] = [element.job_id];
        }
    });
    return companiesByJobs;
};


// Function to get All Applicant who has liked one job
function getAllCompanyApplicants(reactionsJsonData, jobsJsonData){
    const AllUserLikedJobsObj = UserLikedJobs(reactionsJsonData);
    const companiesByJobs = getCompaniesByJobs(jobsJsonData);
    const comapnyApplicantObj = {}

    for(let company_id in companiesByJobs){
        for(let user_id in AllUserLikedJobsObj){
            const AllPostedJobs = companiesByJobs[company_id];
            const AllUserInterestedInJobs = AllUserLikedJobsObj[user_id];

            const doesJobMatch = AllPostedJobs.some(element => AllUserInterestedInJobs.indexOf(element)>=0);
            if(doesJobMatch && comapnyApplicantObj[company_id]){
                comapnyApplicantObj[company_id].push(user_id);
            }
            else if(doesJobMatch){
                comapnyApplicantObj[company_id] = [user_id];
            }
        }
    }
    return comapnyApplicantObj;
}

// Main Program that calculates the company Similarity Score
module.exports = function getCompanySimilarityScore(reactionsJsonData, jobsJsonData){
    const AllCompanyApplicants = getAllCompanyApplicants(reactionsJsonData, jobsJsonData);
    var maximumNumberOfMatches = 0;
    let similarityScore={};

    for(let company_id1 in AllCompanyApplicants){
        for(let company_id2 in AllCompanyApplicants){
            if(company_id1!==company_id2){
                const NumberofMatchesBetweenCompanies = getAllNumberOfMatches(AllCompanyApplicants[company_id1], AllCompanyApplicants[company_id2]);
                if(NumberofMatchesBetweenCompanies > maximumNumberOfMatches){
                    maximumNumberOfMatches = NumberofMatchesBetweenCompanies;
                    similarityScore.maxSimilarityScore = maximumNumberOfMatches;
                    similarityScore.currentCompanies = [company_id1, company_id2];
                }
                else if(NumberofMatchesBetweenCompanies == maximumNumberOfMatches){
                    similarityScore.currentCompanies.push(company_id1, company_id2);
                }
            }
        }
    }

    similarityScore.currentCompanies = similarityScore.currentCompanies.filter((element, index) => similarityScore.currentCompanies.indexOf(element) === index);
    console.log(`The Highest Similarity Score between two companies is ${similarityScore.maxSimilarityScore} and it is between companies ${similarityScore.currentCompanies}`);
}
