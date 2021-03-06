const fs = require('fs');
const { insert, dropCollection, createCollection } = require('../global');

const startGame = async (client) => {
    // await dropCollection('stocks', client);
    fs.readFile('./resources/tickers_json', 'utf8', async (err, data) => {
        data = JSON.parse(data);
        console.log(data);
        for (let i = 0; i < Object.keys(data).length; i++) {
            let ticker = data[i]['ticker'];
            let name = data[i]['name'];
            let sector = data[i]['sector'];
            let price = Math.random() * (1000 - 1) + 1;
            console.log(data[i]);
            await insert('stocks', {
                ticker: ticker,
                name: name,
                sector: sector,
                price: price
            }, client);
        }
    });
}

exports.startGame = startGame;
