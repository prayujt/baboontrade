const { MongoClient } = require('mongodb');

const uri =
	'mongodb://admin:chingchong123@prayujt.com:27017/?authSource=admin&readPreference=primary&directConnection=true&ssl=false';

exports.connect = async (database, callback) => {
	let client = new MongoClient(uri);
	await client.connect();
	callback(client.db(database));
};
