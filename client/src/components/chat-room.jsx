import React from "react";
import "./css/chat-room.css";
import { useSelector, useDispatch } from "react-redux";
import { MySpeech } from "./myspeech";
import { FdSpeech } from "./fdspeech";
import receiveFdSpeech from "./action/receiveFdSpeech";

export function ChatRoom(props) {
  const fdSpeech = useSelector(state => state.FdSpeech);
  const mySpeech = useSelector(state => state.MySpeech);
  const dispatch = useDispatch();

  props.socket.on("send-all", data => {
    console.log(data);
    dispatch(receiveFdSpeech(data));
  });

  return (
    <div className="chat-room">
      {mySpeech.map((item, index) => (
        <MySpeech key={index} data={item} />
      ))}
      {fdSpeech.map((item, index) => (
        <FdSpeech key={index} data={item} />
      ))}
    </div>
  );
}
