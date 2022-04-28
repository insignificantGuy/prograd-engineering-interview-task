const {UserLikedJobs} = require('./task1Functions'); 
const {getAllNumberOfMatches} = require('./task1Functions');

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

function getAllCompanyApplicants(reactionsJsonData, jobsJsonData){
    const AllUserLikedJobsObj = UserLikedJobs(reactionsJsonData);
    const companiesByJobs = getCompaniesByJobs(jobsJsonData);
    const comapnyApplicantObj = {
        company_id:[]
    }

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