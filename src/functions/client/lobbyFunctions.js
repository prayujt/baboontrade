const {
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
  dropDatabase,
} = require('../../global');

const { startGame } = require('../../events/StartGame');

exports.clientLobbyFunctions = async (client, socket) => {
	let gameID_ = 0;
	let username_ = '';
	let uuid_ = '';

	socket.on('lobbyUsernameChange', async (userID, username) => {
    console.log('received name change request');
		await updateField(
			'players',
			{ uuid: userID },
			{ username: username },
			client
		);
	});

	socket.on('saveLobbySettings', async (settings) => {
		await updateField(
			'settings',
			{ gameID: gameID_ },
			{ settings: settings },
			client
		);
	});

	socket.on('clientSendLobbyMessage', async (messageData) => {
		await insert('lobbyMessages', messageData, client);
	});

	socket.on('leaveLobby', async (userID, username, isHost) => {
		let players = await getAll('lobbyPlayers', { gameID: gameID_ }, client);
		let playerFound = false;
		if (isHost) {
			for (const [key, value] of Object.entries(players)) {
				if (value.uuid != userID) {
					updateField(
						'lobbies',
						{ gameID: gameID_ },
						{ host: value.uuid },
						client
					);
					insert(
						'lobbyMessages',
						{
							gameID: gameID_,
							author: 'System',
							message:
								'Host has left the lobby. New host is: ' + value.username,
						},
						client
					);
					playerFound = true;
					socket.to(value.uuid).emit('isNewHost');
					break;
				}
			}
			if (!playerFound) {
        dropDatabase(client);
				// remove('lobbies', { gameID: gameID_ }, client);
				// removeAll('lobbyMessages', { gameID: gameID_ }, client);
			}
		} else if (!isHost) {
			await insert(
				'lobbyMessages',
				{
					gameID: gameID_,
					author: 'System',
					message: username + ' has left the lobby.',
				},
				client
			);
			socket.leave(gameID_);
		}
		remove('lobbyPlayers', { uuid: userID }, client);
	});

	socket.on('startGameInitialization', async (response) => {
      await startGame(client);
      response({
        status: true,
      });
	});

	socket.on('disconnect', () => {
		console.log('user disconnected');
	});
};
