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
  const { IncomingWebhook } = require("@slack/webhook");

  //use .env here !!! IMPORTANT
  const url =
    "https://hooks.slack.com/services/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";

  const webhook = new IncomingWebhook(url);

  const webhookTest = async () => {
    try {
      console.log("Sending slack message");

      const resFromSlack = await webhook.send({
        text: event.body,
        icon_emoji: ":hubspot:",
        //   attachments: [
        //     {
        //       color: "#8697db",
        //       fields: [
        //         {
        //           title: "YOTest ",
        //           value: "Testing Slack Channel",
        //         },
        //       ],
        //     },
        //   ],
      });
      console.log("The message response is : ", resFromSlack);
    } catch (e) {
      console.error("There was an error : ", e);
    }
  };

  webhookTest();

  try {
    console.log(event.body);
    console.log(JSON.stringify(event.body));
    // const ret = await axios(url);
    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: "Sent to slack ",
        // location: ret.data.trim()
      }),
    };
  } catch (err) {
    console.log(err);
    return err;
  }

  return response;
};
