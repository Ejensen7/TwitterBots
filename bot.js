console.log('The bot is starting!');

var Twit = require('twit');
var config = require('./config.js');
var postDetails = require('./post.js');
var getDetails = require('./get.js');

var T = new Twit(config);

var params = {
    q: getDetails.q,
    count: getDetails.count
};

T.get('search/tweets', params, gotData);

function gotData(err, data, response) {
    var tweets = data.statuses;
    for (var i = 0; i < tweets.length; i++){
        console.log('Tweet #'+(i+1)+': '+tweets[i].text);
    }
}

/*T.post('statuses/update', { status: 'hello world!' }, function(err, data, response) {
    console.log(data)
})*/

console.log('The bot is finished!');