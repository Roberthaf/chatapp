import React, { Component } from 'react';
import './Chat.css';

const URL = 'ws://10.75.53.114:8080';

export default class Chat extends Component {
  state = {
    messages: [],
    chatHistory: [],
  };
  ws = new WebSocket(URL);
  
  componentDidMount(){
    this.ws.onopen = event => {

    }

    this.ws.onmessage = event => {
      let data = JSON.parse(event.data);
      
      switch (data.action) {
        case "chatHistory":
          this.setState({
            chatHistory: data.data
          });
          break;
      
        default:
          break;
      }
    }

    this.ws.onclose = event => {

    }
  }

  render() {    
    return (
      <div>
        <div className="ChatMessage-Container">

        </div>
        <div className="ChatInput-Container">

        </div>
      </div>
    );
  }
}