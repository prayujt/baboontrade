const { startGame } = require('../../events/StartGame');

exports.clientLobbyFunctions = async (client) => {
  // socket.on('startGame', async () => {
    startGame(client);
  // });
}
