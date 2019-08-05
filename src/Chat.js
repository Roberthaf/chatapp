import React, { Component } from 'react';
import './Chat.css';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

const URL = 'ws://192.168.2.114:8080';

export default class Chat extends Component {
  constructor(props){
    super(props);
    this.state = {
      messages: [],
      editMessage: "",
      chatHistory: [],
    };
  };
  
  ws = new WebSocket(URL);
  componentDidUpdate(){
    this.updateScroll();
  }
  componentDidMount(){
    this.updateScroll();
    
    this.ws.onopen = event => {

    }

    this.ws.onmessage = event => {
      
      let data = JSON.parse(event.data);
      //console.log("data",data);
      switch (data.action) {
        case "chatHistory":
          //console.log(data.data);
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

  submitMessage = (message, action, mid, edited) => {
    const { name, getDate } = this.props;
    let date = getDate();
    const submitmessage = { action: action, date: date, name: name, message: message, edited: edited, mid: mid };
    this.ws.send(JSON.stringify(submitmessage));
  }

  editMessage = messageData => {
    // If we click on a message we will load the available data nd get the index
    this.setState({
      editMessage: messageData.message,
      mid: messageData.mid
    });
  }

  updateScroll = () => {
    let chatHistoryDiv = document.getElementById('chatHistoryDiv');
    chatHistoryDiv.scrollTop = chatHistoryDiv.scrollHeight;
  }

  render() {
    return (
      <div>
        <div id="chatHistoryDiv"className="ChatHistory-container">
          <ul className="ChatHistory">
          {this.state.chatHistory.map((message, index) =>
          
            <ChatMessage
              key={index}
              mid={index}
              date={message.date}
              action={message.action}
              message={message.message}
              name={message.name}
              editMessage={this.editMessage}
              currentUser={this.props.name}
              edited={message.edited}
            />
            
          )}
          </ul>
        </div>
        <div className="ChatInput-container">
          {/* Change to input feild */}
            <ChatInput 
              onSubmitMessage = {this.submitMessage }
              editMessage = { this.state.editMessage }
              mid = { this.state.mid }
            />
        </div>
      </div>
    );
  }
}