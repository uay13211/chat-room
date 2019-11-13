import React, { useEffect } from "react";
import io from "socket.io-client";
import { TextInput } from "./text-input";
import { ChatRoom } from "./chat-room";
import { Sidebar } from "./sidebar";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

export function ChatPage() {
  const authetication = useSelector(state => state.Authetication);
  const history = useHistory();
  const socket = io("http://localhost:5000");

  // if already login, redirect to login page
  useEffect(() => {
    if (!authetication) {
      history.push("/login");
    }
  }, []);

  return (
    <div>
      <Sidebar />
      <ChatRoom socket={socket} />
      <TextInput socket={socket} />
    </div>
  );
}
