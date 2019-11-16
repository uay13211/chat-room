import React from "react";
import "./css/messagebox.css";
import { useSelector } from "react-redux";

export function MessageBox(props) {
  const username = useSelector(state => state.Username);
  const msgDate = new Date(props.sentDate);

  return (
    <div>
      {username === props.username ? (
        <div className="message-box mine">
          <p className="username">Me</p>
          <p className="message">{props.message}</p>
          <p className="time">{msgDate.toLocaleTimeString()}</p>
        </div>
      ) : (
        <div className="message-box fd">
          <p className="username">Me</p>
          <p className="message">{props.message}</p>
          <p className="time">{msgDate.toLocaleTimeString()}</p>
        </div>
      )}
    </div>
  );
}
