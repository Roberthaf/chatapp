import React, { Component } from 'react';
import './Chat.css';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

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
      console.log("data",data);
      switch (data.action) {
        case "chatHistory":
          console.log(data.data);
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

  submitMessage = (message) => {
    const { name, getDate } = this.props;
    let date = getDate();
    const submitmessage = { action: "message", date: date, name: name, message: message, edited: "false"  };
    this.ws.send(JSON.stringify(submitmessage));

  }

  render() {
    console.log(this.state.chatHistory);
    return (
      <div>
        <div className="ChatMessage-Container">
          <ul>
          {this.state.chatHistory.map((message, index) =>
            <ChatMessage
            key={index}
            mid={index}
            date={message.date}
            message={message.message}
            name={message.name}
            editMessage={this.editMessage}
            currentUser={this.props.name}
            />,
          )}
          </ul>
        </div>
        <div className="ChatInput-Container">
            <ChatInput 
              onSubmitMessage ={ message => this.submitMessage(message) }
            />
        </div>
      </div>
    );
  }
}