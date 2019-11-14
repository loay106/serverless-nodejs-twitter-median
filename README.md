# Calculate the median of the last 1000 tweets with a REST API function on serverless

This project implements a lambda AWS function using serverless, which exposes a REST API to compute the median length of the last 1000 tweets.

# Setup

1) Create an AWS account: 
  In order to connect to the serverless framework you need an AWS account. You can create one here https://aws.amazon.com/.
  Then go to the AWS Management Console and then to the IAM service. Create a new group with the following policies:
      - AWSLambdaFullAccess: This policy is needed to implement 1 function in the serverless framework, which is our median function.
      - AmazonAPIGatewayAdministrator: This policy is needed in order to implement our function as a REST API.
      - AdministratorAccess: This policy is needed in order to grant serverless access to your AWS account. The access can be minimized by         configuring a cfnRole in the serverless framework. For simplicity, I'll leave it as it is.
      
2) Edit the config.js file to include your consumer and app keys from the Twitter developer portal.
3) Run 'npm install' to get the dependencies.
4) Run 'sls deploy' in your CLI to deploy the project in your AWS server.
5) Access your function by copying the endpoint URL in your browser. 
   Note that the function expects 1 query string parameter, called q, so add '?q=<term>' to your endpoint.
  
# How to use

Send a GET request to the endpoint with 1 query string parameter, q, and provide a term as parameter. The function will search the most recent 1000 tweets that include the term and return the median length.

# Notes

1) Twitter offers 2 free search API's - The Standard Search API and The Premium Search API.
   I decided to use The Standard Search API for 2 reasons:
      - It has the option to return the most recent tweets, in contrary to The Premium Search API.
      - It's mostly sufficient: Twitter is a popular website and for any term provided, it's very likely to find 1000 tweets that contain           the term within the last 7 days.
      
   In case The Standard Search API doesn't find 1000 tweets for a given term, the median function fails.
2) I chose to simply return 'null' for any error that might occur. The code provided is documented and it shows where errors could occur.

