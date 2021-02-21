const https = require('https')
const aws = require('aws-sdk');

const ddb = new aws.DynamoDB();
const lambda = new aws.Lambda();

const URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&ids=bitcoin%2Cethereum%2Ctether%2Cpolkadot%2Ccardano%2Cbinancecoin%2Cripple%2Clitecoin%2Cchainlink%2Cbitcoin-cash%2Cstellar%2Cusd-coin%2Cdogecoin%2Cwrapped-bitcoin%2Cuniswap%2Caave%2Ccosmos%2Ceos%2Cmonero%2Cbitcoin-cash-sv%2Ciota%2Ctron%2Cnem%2Ctezos%2Cvechain%2Ctheta-token%2Chavven%2Cavalanche-2%2Cneo%2Chuobi-token%2Cterra-luna%2Cdash%2Cokb%2Ccrypto-com-chain%2Cthe-graph%2Celrond-erd-2%2Ccompound-ether%2Csolana%2Cmaker%2Cftx-token%2Ccdai%2Cdai%2Cfilecoin%2Ccelsius-degree-token%2Ckusama%2Csushi%2Ccompound-governance-token%2Czcash%2Cethereum-classic%2Ccompound-usd-coin&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d'

const getCoinData = () => {
    return new Promise((resolve, reject) => {
        https.get(URL, (resp) => {
            let data = '';

            // A chunk of data has been received.
            resp.on('data', (chunk) => {
                data += chunk;
            });
            // The whole response has been received. Print out the result.
            resp.on('end', async () => {
                const dataJson = JSON.parse(data);
                resolve(dataJson);
            });

        }).on("error", (err) => {
            console.log("Error: " + err.message);
            reject(err);
        });
    })
}

exports.handler = async (event, context) => {
    const data = await getCoinData();
    const date = new Date();

    const Items = data.map(entry => ({
        id: { S: entry.id },
        cgId: { S: entry.id },
        createdAt: { S: date.toISOString() },
        updatedAt: { S: date.toISOString() },
        currentPrice: { N: entry.current_price.toString() },
        image: { S: entry.image },
        name: { S: entry.name },
        symbol: { S: entry.symbol },
        valueChange24H: { N: entry.price_change_percentage_1h_in_currency.toString() },
        valueChange1D: { N: entry.price_change_percentage_24h_in_currency.toString() },
        valueChange7D: { N: entry.price_change_percentage_7d_in_currency.toString() },
        priceHistoryString: { S: JSON.stringify(entry.sparkline_in_7d.price) },
    }))

    try {
        await Promise.all(Items.map(Item => {
            const params = {
                Item,
                TableName: process.env.COIN_TABLE,
            }

            return ddb.putItem(params).promise();
        }))
    } catch (e) {
        console.log(e);
        context.done(null, event);
    }

    lambda.invoke({
        FunctionName: process.env.NET_WORTH_CALCULATOR_FUNCTION,
        InvocationType: "Event"
    }).send();
    context.done(null, event);
};
