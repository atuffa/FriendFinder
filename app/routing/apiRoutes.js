// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on friends array etc.
// ===============================================================================

let friendArray = require("../data/friend.js");
let path = require("path")
// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/friends... they are shown a JSON of the data in the friends)
  // ---------------------------------------------------------------------------

    app.get("/api/friends", function(req, res) {
        console.log(friendArray)
        res.json(friendArray);
    });

    let sample = [4,3,6,9,6,7,2,1,6,4]
    app.post("/api/friends", function(req, res){
        // the new post value inputed
        let newFriend = req.body;
        // console.log(newFriend);

        // used to store the best match from the databse 
        let bestMatch = [];
        
        // varibales to store the diffrence between the sscore values
        let rawDiff =[]
        let totalDiff = 0;
        let diff = 0;

        // for loop to calculate the diff of score between the user and the list of friends in the database
        for (i in friendArray){
              console.log(friendArray[0].scores[0])
            for(j in friendArray[i].scores){
                diff = Math.abs(parseInt(friendArray[i].scores[j]) - parseInt(newFriend.scores[j]))
                totalDiff += diff
                
            }//End of for (j)

            // push the totalDiff into the array rawdata
            rawDiff.push(totalDiff);
            // console.log(totalDiff)

            // Setting the totalDiff to zero once the i iterantion(loops) is completed
            totalDiff=0;

        }//End of for (i)

        // get the min value of all the diff's
        let minValue = Math.min.apply(null, rawDiff)
        // console.log(minValue);
        
        // function to find index of if there are multiple element with the same minValue
        let indexOfMinValue = function(array,element){
            var counts = [];
            for (let i in array){
                if (array[i] === element) {  
                    counts.push(i);
                }// End of if condition
            }//End of for loop
            return counts;
        }// End of indexOfMinValue
        // console.log(indexOfMinValue(rawDiff, minValue))
        // For loop used to push the elements that mactch to bestMatch array
        for (i in indexOfMinValue(rawDiff, minValue)){
            bestMatch.push(friendArray[i]);
        }//End of for loop

        // push the new player to friendArray once the best match is figured out
        friendArray.push(newFriend);

        // console.log(bestMatch)
        // return the best match friend
        res.json(bestMatch);

    }); // End of app.post
}//End of module.export
