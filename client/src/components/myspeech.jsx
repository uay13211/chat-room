import React from "react";
import "./css/speechbox.css";

export function MySpeech(props) {
  return (
    <div class="fd-speech-box">
      <p>{props.data}</p>
    </div>
  );
}
