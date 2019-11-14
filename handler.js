'use strict';

const MAX_TWEETS = 200;
const TWEETS_PER_REQUEST = 100;

function retrieveTweets(T,parameters){
	return T.get('search/tweets', parameters);
}

async function CalculateTMedian(term){
	var config = require('./config.js');
	var Twit = require('twit');
	var T = new Twit(config);
	
	var parameters = {result_type: 'recent' };
	parameters.count = TWEETS_PER_REQUEST;
	parameters.q = term;
	var tweet_sizes = new Array(MAX_TWEETS);
	
	for(let i=0; i<MAX_TWEETS/TWEETS_PER_REQUEST; i++){
		await retrieveTweets(T,parameters).then(res => {
			let lowest_id = null;
			let tweets = res.data.statuses;
			for(let j=0;j<tweets.length; j++){
				tweet_sizes[TWEETS_PER_REQUEST*i+j] = tweets[j].text.length;
				if(!lowest_id || lowest_id>tweets[i].id){
					lowest_id = tweets[j].id;
				}
			}
			parameters.max_id = lowest_id; 
		}).catch(error => {
			console.log(error);
		});
	}
	tweet_sizes.sort();
	return tweet_sizes[MAX_TWEETS/2+1];
}

async function twitterMedianLength(term){
	var median_res = await CalculateTMedian(term);
	return median_res;
}

module.exports.median = (event, context, callback) => {
	const term = event.term;
	if(!term){
		// error retrieving term
		callback(null, null);
	}
	let median_res = twitterMedianLength(term);
	if(!median_res){
		// error connecting to Twitter API
		callback(null, null);
	}
	callback(null, JSON.stringify(median_res));
};