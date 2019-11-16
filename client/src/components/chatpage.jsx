import React, { useEffect, useRef } from "react";
import "./css/chat-page.css";
import io from "socket.io-client";
import { Sidebar } from "./sidebar";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { MessageBox } from "./messageBox";
import setMessage from "./action/setMessage";

const endPoint = "http://localhost:5000";
const axios = require("axios");
let socket;

export function ChatPage() {
  const authetication = useSelector(state => state.Authetication);
  const username = useSelector(state => state.Username);
  const message = useSelector(state => state.Message);
  const dispatch = useDispatch();
  const msgInputBox = useRef(null);
  const history = useHistory();

  // // if already login, redirect to login page
  // useEffect(() => {
  //   if (!authetication) {
  //     history.push("/login");
  //   }
  // }, []);

  useEffect(() => {
    axios
      .get("/message")
      .then(res => {
        dispatch(setMessage(res.data));
      })
      .catch(err => console.log(err));
  }, []);

  function sendMessage(e) {
    e.preventDefault();
    const messageToSend = {
      message: msgInputBox.current.value,
      username: username
    };
    // send message
    socket.emit("send-message", messageToSend);
    msgInputBox.current.value = "";
  }

  useEffect(() => {
    socket = io(endPoint);
    socket.on("send-all", data => {
      const payload = [...message, data];
      dispatch(setMessage(payload));
    });
    // important!!!!!
    return () => {
      socket.close();
    };
  }, [endPoint, message]);

  return (
    <div>
      <Sidebar />
      <div className="chat-room">
        {message.map((msg, index) => (
          <MessageBox
            key={index}
            message={msg.message}
            username={msg.username}
            sentDate={msg.sentDate}
          />
        ))}
      </div>
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
    </div>
  );
}
