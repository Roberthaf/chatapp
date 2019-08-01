import React, { Component } from 'react';
import './Chat.css';

const URL = 'ws://10.75.53.114:8080';

export default class Chat extends Component {
  state = {
    messages: [],
    chatHistory: [],
  };
  ws = new WebSocket(URL);
  render() {    
    return (
      <div className="chatContainer">
        <div className="chatMessageContainer">

        </div>
        <div className="chatInputContainer">

        </div>
      </div>
    );
  }
}