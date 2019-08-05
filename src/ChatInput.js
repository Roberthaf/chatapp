import React, { Component } from 'react';
import "./ChatInput.css";

export default class ChatInput extends Component {
  constructor(props){
    super(props);
    this.state = {
      message: '',
      editmessage: '',
      action: "message",
      mid: null,
    };
  };

  componentDidUpdate(prevProps){
    let newMessage = this.props.editMessage;
    let messId = this.props.mid;
    if(prevProps.editMessage !== this.props.editMessage){
      this.setState({
        action: "editmessage",
        message: newMessage,
        mid: messId
      });
    }
  }

  componentDidMount(){
    let textarea = document.getElementsByClassName('ChatInput-textarea');
    textarea[0].addEventListener('keypress', (e) => {
      var key = e.which || e.keyCode;
      if(key === 13){
          //Enter is key 13
          e.preventDefault();
          this.props.onSubmitMessage(this.state.message, this.state.action, this.state.mid)
          this.setState({
            message: '',
            // Reset state so we don't send editMessages
            messId: null,
            action: "message",
          });
        }
    });
  }

  render() {
    return (
      <form
      id="Submit-form"
        className="ChatInput-form"
        onSubmit={e => {
          e.preventDefault()
          this.props.onSubmitMessage(this.state.message, this.state.action, this.state.mid)
          this.setState({ 
            message: '',
            // Reset state so we don't send editMessages
            messId: null,
            action: "message",        
          })
        }}
      >
        <textarea
          className="ChatInput-textarea"
          type="text"
          placeholder={'Enter message...'}
          value={this.state.message}
          onChange={e => this.setState({ message: e.target.value })}
        >
        </textarea>
        <input id="submit" type="submit" value={'Send'} />
      </form>
    );
  }
}