const socket = io("http://localhost:3000");

let messageInput = document.getElementById("message-input");
let messageForm = document.getElementById("message-form");
let chatroom = document.getElementsByClassName("chat-room")[0];

messageForm.addEventListener("submit", e => {
  e.preventDefault();
  let message = messageInput.value;
  // send message
  socket.emit("send-message", message);
  messageInput.value = "";
});

socket.on('send-all', data => {
  chatroom.innerHTML = "<p>" + data + "</p>";
});
