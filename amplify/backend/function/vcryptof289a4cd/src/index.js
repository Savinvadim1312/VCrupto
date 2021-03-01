const { DynamoDB } = require('aws-sdk');
const ddb = new DynamoDB();

const USER_TABLE = process.env.USER_TABLE;
const COIN_TABLE = process.env.COIN_TABLE;
const PORTFOLIO_COIN_TABLE = process.env.PORTFOLIO_COIN_TABLE;

const getAllCoins = async () => {
    const params = {
        TableName: COIN_TABLE,
        ProjectionExpression: 'id,currentPrice',
    }

    const coins = await ddb.scan(params).promise();
    return coins.Items.map(coin => ({
        id: coin.id.S,
        currentPrice: parseFloat(coin.currentPrice.N)
    }));
}

const getAllUsers = async () => {
    const params = {
        TableName: USER_TABLE,
        ProjectionExpression: 'id',
    }

    const users = await ddb.scan(params).promise();
    return users.Items.map(user => ({
        id: user.id.S
    }));
}

const getUserCoins = async (user) => {
    const params = {
        TableName: PORTFOLIO_COIN_TABLE,
        IndexName: 'byUser',
        KeyConditionExpression: "userId = :userId",
        ExpressionAttributeValues: {
            ":userId": { S: user.id }
        },
        ProjectionExpression: 'coinId,amount',
    }

    const usersCoins = await ddb.query(params).promise();
    return usersCoins.Items.map(usersCoin => ({
        coinId: usersCoin.coinId.S,
        amount: parseFloat(usersCoin.amount.N)
    }));
}

const getUserCoinPrice = (userCoin, coins) => {
    const coin = coins.find(c => c.id === userCoin.coinId);
    return coin ? coin.currentPrice : 0;
}

const updateUserNetWorth = async (user, newNetWorth) => {
    console.log(`User ${user.id} new networth: ${newNetWorth}`);

    const params = {
        TableName: USER_TABLE,
        Key: {
            id: { S: user.id }
        },
        UpdateExpression: 'SET networth = :networth',
        ExpressionAttributeValues: {
            ":networth": { N: newNetWorth.toString() }
        }
    }

    await ddb.updateItem(params).promise();
}

const calculateUserNetWorth = async (user, coins) => {
    const userCoins = await getUserCoins(user);

    const sumUserCoins = (sum, userCoin) => sum + userCoin.amount * getUserCoinPrice(userCoin, coins);

    const netWorth = userCoins.reduce(sumUserCoins, 0)

    return updateUserNetWorth(user, netWorth);
}

exports.handler = async () => {
    const coins = await getAllCoins();
    const users = await getAllUsers();

    await Promise.all(users.map(user => calculateUserNetWorth(user, coins)));

    return true;
};
