// button ids
const joinRoomBtn = document.getElementById("joinRoomBtn");
const joinGameBtn = document.getElementById("joinGameBtn");

// form element ids
const roomForm = document.getElementById("roomForm");
const roomFormHeader = document.getElementById("roomFormHeader");
const roomCodeInput = document.getElementById("roomCodeInput");
const destinationLink = document.getElementById("destinationLink");

const changeFormElements = (headerText, linkText, baseUrl) => {
  roomForm.style.display = "block";
  roomFormHeader.innerText = headerText;
  destinationLink.innerText = linkText;
  roomCodeInput.addEventListener("keyup", (e) => {
    console.log(e.target.value);
    if (e.target.value.length !== 4) {
      console.log("Less than 4");
      destinationLink.setAttribute("href", "#");
    } else {
      destinationLink.setAttribute("href", `/${baseUrl}/${e.target.value}`);
    }
  });
};

joinRoomBtn.addEventListener("click", () => {
  changeFormElements("Create/Join Room", "Join This Room", "desktop");
});

joinGameBtn.addEventListener("click", () => {
  changeFormElements("Join Game", "Enter Room Code", "phone");
});
