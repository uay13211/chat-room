import React from 'react';
import "./css/text-input.css"
import io from 'socket.io-client';

const socket = io("http://localhost:5000");

export function TextInput(){
    return(
        <form id="message-form">
            <div className="text-box input-group fixed-bottom">
                <input
                    id="message-input"
                    type="text"
                    className="form-control"
                    name="data"
                    placeholder="Say somthing to your friend"
                />
                <div className="input-group-append">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </div>
      </form>
    )
} 
