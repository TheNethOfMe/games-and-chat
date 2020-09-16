const { Game } = require("./game-logic");
let gameData = {};

const socketio = (io) => {
  io.on("connection", (socket) => {
    socket.on("join-room", (roomId, userId) => {
      socket.join(roomId);
      gameData[roomId] = new Game(roomId);
      // socket.to(roomId).broadcast.emit("user-connected", currentGame);
      socket.on("disconnect", () => {
        socket.to(roomId).broadcast.emit("user-disconnected", userId);
      });
    });
    socket.on("join-game", (roomId, userId) => {
      // player joins game via phone
      socket.join(roomId);
      gameData[roomId].addPlayer(userId);
      console.log(userId);
      socket
        .to(userId)
        .emit("enter-name", gameData[roomId].players[userId].name);

      socket.on("disconnect", () => {
        socket.to(roomId).broadcast.emit("player-disconnected", userId);
        gameData[roomId].removePlayer(userId);
      });
    });
  });
};

module.exports = socketio;
