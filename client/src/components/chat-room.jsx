import React from 'react';
import "./css/chat-room.css";
import io from 'socket.io-client';

const socket = io("http://localhost:5000");

// messageForm.addEventListener("submit", e => {
//   e.preventDefault();
//   let message = messageInput.value;
//   // send message
//   socket.emit("send-message", message);
//   messageInput.value = "";
// });

// socket.on('send-all', data => {
//   chatroom.innerHTML = "<p>" + data + "</p>";
// });


export function ChatRoom(){
    return(
        <div className="chat-room">

        </div>
    )
} 