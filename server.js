const express = require("express");
const app = express();
const server = require("http").Server(app);

const io = require("socket.io")(server);
require("./socket-logic")(io);

// const { Game } = require("./game-logic");
// let currentGame;

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/desktop/:id", (req, res) => {
  res.render("desktop", { roomId: req.params.id });
});

app.get("/phone/:id", (req, res) => {
  res.render("phone", { roomId: req.params.id });
});

// io.on("connection", (socket) => {
//   socket.on("join-room", (roomId, userId) => {
//     socket.join(roomId);
//     currentGame = new Game(roomId);
//     socket.to(roomId).broadcast.emit("user-connected", currentGame);
//     socket.on("disconnect", () => {
//       socket.to(roomId).broadcast.emit("user-disconnected", userId);
//     });
//   });
//   socket.on("join-game", (roomId, userId) => {
//     socket.join(roomId);
//     currentGame.addPlayer(userId);
//     console.log(currentGame);
//     socket.to(roomId).broadcast.emit("player-connected", currentGame);
//     socket.on("disconnect", () => {
//       socket.to(roomId).broadcast.emit("player-disconnected", userId);
//     });
//   });
// });

server.listen(3000, () => {
  console.log("Server running on port 3000.");
});
