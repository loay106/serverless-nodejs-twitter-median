# Calculate the median of the last 1000 tweets with a REST API function using serverless framework

This project implements a lambda AWS function using the serverless framework, which exposes a REST API to compute the median length of the last 1000 tweets.

# Setup instructions

1) Create an AWS account: 
  You can create one here https://aws.amazon.com/. Then go to the AWS Management Console and then to the IAM service. Create a new group     with the following policies:
      - AWSLambdaFullAccess: This policy is needed to implement 1 function in the serverless framework, which is our median function.
      - AmazonAPIGatewayAdministrator: This policy is needed in order to implement our function as a REST API.
      - AdministratorAccess: This policy is needed in order to grant serverless access to your AWS account. The access can be minimized by         configuring a cfnRole in the serverless framework. For simplicity, I'll leave it as it is.
2) Create a serverless account and connect it to your AWS account.
3) Create a twitter developer account and create an app, then subscribe to Premium Search API sandbox.
4) Edit the config.js file to include your consumer and app keys from the Twitter developer portal.
5) Run 'npm install' to get the dependencies.
6) Run 'sls deploy' in your CLI to deploy the project in your AWS server.
7) Access your function by copying the endpoint URL in your browser. 
   Note that the function expects 1 query string parameter, called q, so add '?q=<term>' to your endpoint.
 
# How to use

Send a GET request to the endpoint with 1 query string parameter, q, and provide a term as parameter. The function will search the most recent 1000 tweets that include the term and return the median length.

# Notes

1) Twitter offers 2 free search API's - The Standard Search API and The Premium Search API.
   The Premium Search API was used because it offers more data to search.
   In case The Premium Search API doesn't find 1000 tweets for a given term, the median function fails.
2) The endpoint returns 'null' for any error that might occur. The code provided is documented and it shows where errors could occur.
