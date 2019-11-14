'use strict';

const MAX_TWEETS = 1000;
const TWEETS_PER_REQUEST = 100;

function retrieveTweets(T,parameters){
	return T.get('search/tweets', parameters);
}

async function twitterMedianLength(term){
	var config = require('./config.js');
	var Twit = require('twit');
	var T = new Twit(config);
	
	var parameters = {result_type: 'recent' };
	parameters.count = TWEETS_PER_REQUEST;
	parameters.q = term;
	var tweet_sizes = new Array(MAX_TWEETS);
	var retrieving_error = false;
	
	for(let i=0; i<MAX_TWEETS/TWEETS_PER_REQUEST; i++){
		await retrieveTweets(T,parameters).then(res => {
			let lowest_id = null;
			let tweets = res.data.statuses;
			if(tweets.length < TWEETS_PER_REQUEST && TWEETS_PER_REQUEST*i+tweets.length < MAX_TWEETS){
				// not enough tweets found
				throw "Not enough tweets";
			}
			for(let j=0;j<tweets.length; j++){
				tweet_sizes[TWEETS_PER_REQUEST*i+j] = tweets[j].text.length;
				if(!lowest_id || lowest_id>tweets[i].id){
					lowest_id = tweets[j].id;
				}
			}
			parameters.max_id = lowest_id; 
		}).catch(error => {
			retrieving_error = true;
		});
		if(retrieving_error){break;}
	}
	if(retrieving_error) return null;
	tweet_sizes.sort();
	return tweet_sizes[MAX_TWEETS/2+1];
}

module.exports.median = async function(event, context, callback){
	const term = event.term;
	if(!term){
		// error retrieving term
		callback(null, null);
	}
	let median_res = await twitterMedianLength(term);
	if(!median_res){
		// error connecting to Twitter API or retrieving tweets
		callback(null, null);
	}
	callback(null, JSON.stringify(median_res));
};
