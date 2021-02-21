const aws = require('aws-sdk');
const ddb = new aws.DynamoDB();

exports.handler = async (event, context) => {
  if (!event.request.userAttributes.sub) {
    console.log("Error: No user was written to DynamoDB")
    context.done(null, event);
    return;
  }

  // Save the user to DynamoDB
  const date = new Date();

  const Item = {
    'id': { S: event.request.userAttributes.sub },
    '__typename': { S: 'User' },
    'type': { S: 'User' },
    'email': { S: event.request.userAttributes.email },
    'createdAt': { S: date.toISOString() },
    'updatedAt': { S: date.toISOString() },
    'networth': { N: "100000.0" }
  }

  if (event.request.userAttributes.picture) {
    Item.image = { S: event.request.userAttributes.picture };
  }

  if (event.request.userAttributes.name) {
    Item.name = { S: event.request.userAttributes.name };
  }

  const params = {
    Item,
    TableName: process.env.USERTABLE,
  }

  try {
    await ddb.putItem(params).promise();
    console.log("Success");
  } catch (e) {
    console.log("Error", e);
  }

  const PortfolionCoinItem = {
    'id': { S: `${event.request.userAttributes.sub}-usd` },
    '__typename': { S: 'PortfolioCoin' },
    'createdAt': { S: date.toISOString() },
    'updatedAt': { S: date.toISOString() },
    'userId': { S: event.request.userAttributes.sub },
    'coinId': { S: process.env.USD_COIN_ID },
    'amount': { N: "100000.0" }
  }

  try {
    await ddb.putItem({
      Item: PortfolionCoinItem,
      TableName: process.env.PORTFOLIO_COIN_TABLE,
    }).promise();
    console.log("Success");
  } catch (e) {
    console.log("Error", e);
  }
  context.done(null, event);
}
