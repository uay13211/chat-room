import React, { useRef } from "react";
import "./css/text-input.css";
import { useDispatch } from "react-redux";
import sendSpeechToAll from "./action/sendSpeechToAll";

export function TextInput(props) {
  const dispatch = useDispatch();
  const msgInputBox = useRef(null);

  function sendMessage(e) {
    e.preventDefault();
    let message = msgInputBox.current.value;
    // send message
    props.socket.emit("send-message", message);
    dispatch(sendSpeechToAll(message));
    msgInputBox.current.value = "";
  }

  return (
    <form id="message-form" onSubmit={sendMessage}>
      <div className="text-box input-group fixed-bottom">
        <input
          type="text"
          ref={msgInputBox}
          className="form-control"
          name="data"
          placeholder="Say somthing"
        />
        <div className="input-group-append">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}
