// import hubspotFunc from "./hubspotHandler"
// const hubspot = require("./hubspotHandler");
// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
let response;

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */
exports.lambdaHandler = async (event, context) => {
  const message = JSON.parse(event.body);

  const { IncomingWebhook } = require("@slack/webhook");
  const url = "";
  const webhook = new IncomingWebhook(url);

  console.log(message);
  const fName = message.fName;
  const lName = message.lName;
  const email = message.email;
  const slackID = message.slackID;
  const action = message.action;
  console.log("the values are : ", fName, lName, email, slackID, action);

  const slackMessage =
    "<@" +
    slackID +
    "> /n" +
    " The user " +
    fName +
    " " +
    lName +
    " with email " +
    email +
    " performed action: " +
    action;
  console.log("The Slack message is:", message);

  try {
    await webhook.send({
      text: slackMessage,
    });
  } catch (e) {
    console.error("There was a error with the request", e);
  }
  response = {
    statusCode: 200,
    body: JSON.stringify({
      message: "Hello, this is the trigger app.js for DD",
    }),
  };

  // const properties = {
  //   email: email,
  //   firstname: fName,
  //   lastname: lName,
  //   lifecyclestage: action,
  // };

  // hubspotFunc(properties);

  return response;
};
