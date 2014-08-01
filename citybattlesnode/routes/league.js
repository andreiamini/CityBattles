var express = require('express');
var router = express.Router();

var Parse = require('parse').Parse;

Parse.initialize("unitX88tQcs0FUtOy1ridPOKzNiGYlcvFDtCduHP", "HF0sGCMBC2KqzagEvw5dHfEVCt17CrHg9YbzQfll");


/* GET home page. */
router.get('/', function(req, res) {
  var Cities = Parse.Object.extend("Cities");
  var query = new Parse.Query(Cities);
  query.descending("Score");
  query.find({
   success: function(results) {
     console.log("Successfully retrieved " + results.length + " scores.");
     // Do something with the returned Parse.Object values
     for (var i = 0; i < results.length; i++) { 
       var object = results[i];
       cityList = object.get('City')
       scoreList = object.get('Score')
       GLOBAL.cityList = cityList;
       GLOBAL.scoreList = scoreList;
       GLOBAL.results = results;
     }
     res.render('league',{'results': JSON.stringify(results)});
   },
   error: function(error) {
     console.log("Error: " + error.code + " " + error.message);
   }
 });
});

module.exports = router;