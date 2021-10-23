const {
    connect,
    databaseExists,
	createCollection,
	dropCollection,
	remove,
	removeAll,
	get,
	getAll,
	insert,
	exists,
	update,
	updateField,
	replace,
	watch,
	match,
} = require('../../global');

const { clientLobbyFunctions } = require('./lobbyFunctions');
const { serverLobbyFunctions } = require('../server/lobbyFunctions');

exports.clientFindLobbyFunctions = async (socket, client) => {
	socket.on('joinLobby', async (gameID, uuid, username, response) => {
		// let gameExists = await exists('lobbies', { gameID: gameID }, client);
        let gameExists = await databaseExists('baboonTrade' + gameID.toString(), client);
        console.log(gameExists);
		let status = true;
		let player = {
			gameID: gameID,
			uuid: uuid,
			username: username,
		};
		let message = {
			gameID: gameID,
			author: 'System',
			message: username + ' has joined the lobby.',
		};

		socket.join(uuid);
		socket.join(gameID);

        if (gameExists && gameID != '') {
            connect('baboonTrade' + gameID.toString(), async (newClient) => {
                let playerExists = await exists('players', { uuid: uuid }, newClient);
                if (playerExists) {
                    await replace('players', { uuid: uuid }, player, newClient);
                } else {
                    await insert('players', player, newClient);
                }

                gameID_ = gameID;
                username_ = username;
                uuid_ = uuid;

                await insert('lobbyMessages', message, newClient);
                clientLobbyFunctions(newClient, socket);
            });
        } else {
            status = false;
        }

		response({
			status: status,
		});
	});

	socket.on('createLobby', async (gameID, uuid, username) => {
        connect('baboonTrade' + gameID.toString(), async (newClient) => {
            await insert(
                'settings',
                {
                    gameID: gameID,
                    gameStarted: false,
                    host: uuid,
                    settings: {
                    },
                },
                newClient
            );

            let player = {
                gameID: gameID,
                uuid: uuid,
                username: username,
            };

            socket.join(uuid);
            socket.join(gameID);

            let playerExists = await exists('players', { uuid: uuid }, newClient);
            if (playerExists) {
                await replace('players', { uuid: uuid }, player, newClient);
            } else {
                await insert('players', player, newClient);
            }

          clientLobbyFunctions(newClient, socket);
          serverLobbyFunctions(newClient, socket);
        });

		gameID_ = gameID;
		username_ = username;
		uuid_ = uuid;
	});
}
