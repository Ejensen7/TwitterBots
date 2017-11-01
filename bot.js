//Variables
var Twit = require('twit');
var config = require('./leConfig.js');
var postDetails = require('./post.js');
var getDetails = require('./get.js');
var T = new Twit(config);
// End Variables

//Params
var getParams = {
    q: getDetails.q,
    count: getDetails.count
};
var postParams = {
    hashtags: postDetails.hashtags,
    status: postDetails.base
};
// End Params

//Functions
function gotData(err, data, response) {
    var tweets = data.statuses;
    for (var i = 0; i < tweets.length; i++){
        console.log('Tweet #'+(i+1)+': '+tweets[i].text);
    }
}
function tweeted(err, data, response) {
    if(err){
        console.log('Error! - ' + data + ', response: ' + response);
    }
    console.log('Tweet Posted - "' + postParams.status + '"');
}
function tweet() {
    var r1 = Math.floor(Math.random()*100);
    var hashtags = ['', '', '', ''];
    for (var i = 0; i < 4; i++){
        var bool = true;
        while(bool){
            var num = Math.floor(Math.random()*15)-1;
            if(num > 0){
                var hashtag = '#'+postParams.hashtags[num];
                if (hashtags.indexOf(hashtag) === -1){
                    hashtags[i] = hashtag;
                    bool = false;
                }
            }
        }

    }
    postParams.status = hashtags + ' Lucky Number: ' + r1;

    T.post('statuses/update',postParams, tweeted);
}
function search(searchTerm) {
    if(searchTerm !== ''){
        getParams.q = searchTerm;
    }
    T.get('search/tweets', getParams, gotData);
}
function searchBase() {
    T.get('search/tweets', getParams, gotData);
}
// End Functions

//Program
console.log('The bot is starting!');
tweet();
setInterval(tweet, 1000*60*5);

// End Program