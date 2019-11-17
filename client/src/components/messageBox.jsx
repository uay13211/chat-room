import React, { useState, useEffect } from "react";
import "./css/messagebox.css";
import { useSelector } from "react-redux";

export function MessageBox(props) {
  const username = useSelector(state => state.Username);
  const [time, setTime] = useState("0");

  useEffect(() => {
    const msgDate = new Date(props.sentDate);
    const today = new Date();
    if (
      msgDate.getDate() === today.getDate() &&
      msgDate.getMonth() === today.getMonth() &&
      msgDate.getFullYear() === today.getFullYear()
    ) {
      setTime(msgDate.toLocaleTimeString([], { timeStyle: "short" }));
    } else {
      if (
        today.getDate() - msgDate.getDate() === 1 &&
        msgDate.getMonth() === today.getMonth()
      ) {
        setTime(
          "昨天 " + msgDate.toLocaleTimeString([], { timeStyle: "short" })
        );
      } else {
        setTime(msgDate.toLocaleDateString());
      }
    }
  }, [new Date().getDate()]);

  return (
    <div>
      {username === props.username ? (
        <div className="message-box mine">
          <p className="username">Me</p>
          <p className="message">{props.message}</p>
          <p className="time">{time}</p>
        </div>
      ) : (
        <div className="message-box fd">
          <p className="username">{props.username}</p>
          <p className="message">{props.message}</p>
          <p className="time">{time}</p>
        </div>
      )}
    </div>
  );
}
