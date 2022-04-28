// Function to get All Jobs That are Liked By User
function UserLikedJobs(userObj){
    var UserLikedJobsObj = {};

    const allLikedJobs = userObj.filter((item)=>item.direction);

    allLikedJobs.forEach(element => {
        if(UserLikedJobsObj[element.user_id]!=undefined){
            UserLikedJobsObj[element.user_id].push(element.job_id);
        }
        else{
            UserLikedJobsObj[element.user_id] = [element.job_id];
        }
    });
    return UserLikedJobsObj;
}

function getAllNumberOfMatches(userArray1, userArray2){
    var totalNumberofMatches = [];
    for(var i = 0; i<userArray1.length;i++){
        if(userArray2.indexOf(userArray1[i])!==-1){
            totalNumberofMatches.push(userArray1[i]);
        }
    }

    const filteredTotalNumberOfMatches = totalNumberofMatches.filter((element, index)=> totalNumberofMatches.indexOf(element)=== index);

    const sortedFilteredTotalNumberOfMatches = filteredTotalNumberOfMatches.sort((element1, element2)=> element1-element2);
    return sortedFilteredTotalNumberOfMatches.length;
}

function getSimilarityScores(reactionsJsonData){
    const AllUserLikedJobs = UserLikedJobs(reactionsJsonData);
    let maximumNumberofMatches = 0;
    var getSimilarityScoresObject = {};
    for(let user_id1 in AllUserLikedJobs){
        for(let user_id2 in AllUserLikedJobs){
            if(user_id1!==user_id2){
                var NumberOfMatches = getAllNumberOfMatches(AllUserLikedJobs[user_id1],AllUserLikedJobs[user_id2]);
                if(NumberOfMatches>maximumNumberofMatches){
                    maximumNumberofMatches = NumberOfMatches;
                    getSimilarityScoresObject = {
                        similarityScore: NumberOfMatches,
                        users: [user_id1, user_id2]
                    };
                }
                else if(NumberOfMatches === maximumNumberofMatches){
                    getSimilarityScoresObject.users.push(user_id1,user_id2);
                }
            }
        }
    }

    getSimilarityScoresObject.users = getSimilarityScoresObject.users.filter((element, index) => getSimilarityScoresObject.users.indexOf(element) === index);
    console.log(`The Highest Similarity Score between two users is ${getSimilarityScoresObject.similarityScore} and it is between users ${getSimilarityScoresObject.users}`);
};


module.exports = {UserLikedJobs, getAllNumberOfMatches, getSimilarityScores};