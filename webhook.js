require("dotenv").config();
const { IncomingWebhook } = require("@slack/webhook");

const url = process.env.SLACK_WEBHOOK;

const webhook = new IncomingWebhook(url);

const webhookTest = async () => {
  try {
    console.log("Sending slack message");

    const resFromSlack = await webhook.send({
      text: "Testing SLACK",
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
