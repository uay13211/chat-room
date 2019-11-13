import React from "react";
import "./css/speechbox.css";

export function FdSpeech(props) {
  return (
    <div class="my-speech-box">
      <p>{props.data}</p>
    </div>
  );
}
