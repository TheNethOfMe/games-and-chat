const socket = io("/");
const myPeer = new Peer(undefined, {
  host: "localhost",
  port: "9000",
  path: "/myapp",
});

let playerId;

const elYourName = document.getElementById("your-name");

myPeer.on("open", (id) => {
  playerId = id;
  socket.emit("join-game", ROOM_ID, playerId);
});

// socket.on("user-connected", (userId) => {
//   console.log("A new user connected.", userId);
// });

// socket.on("player-connected", (userId) => {
//   console.log("A new player connected.", userId);
// });

socket.on("enter-name", (player) => {
  console.log("ENTER NAME");
  changeInterface("enter-name");
  elYourName.innerText = `Player ${player}`;
});

const changeInterface = (interface) => {
  // clear all section divs
  const allSections = document.getElementsByTagName("section");
  for (let i = 0; i < allSections.length; i++) {
    allSections[i].style.display = "none";
  }
  document.getElementById(interface).style.display = "block";
};

const changeName = (newName) => {
  elYourName.innerText = newName;
  socket.emit("name-change", playerId, newName);
};
