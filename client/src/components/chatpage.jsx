import React from "react";
import { TextInput } from "./text-input";
import { ChatRoom } from "./chat-room";
import { Sidebar } from "./sidebar";

export function ChatPage() {
  return (
    <div>
      <Sidebar />
      <ChatRoom />
      <TextInput />
    </div>
  );
}
