let app = require('express')();
let http = require('http').Server(app);
const { MongoClient } = require('mongodb');

const { connect } = require('./global');

const io = require('socket.io')(http, {
	cors: {
		origin: 'http://localhost:2000',
		methods: ['GET', 'POST'],
	},
});

let port = 8000;

connect('baboontrade', async (client) => {
	io.on('connection', (socket) => {
		console.log('user connected');
	});
});

app.get('/', (req, res) => {
	res.send('Hello World!');
});

http.listen(port, () => {
	console.log(`Server listening at http://localhost:${port}`);
});
