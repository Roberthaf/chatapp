import React, { Component } from 'react';
import "./ChatInput.css";

export default class ChatInput extends Component {
  constructor(props){
    super(props);
    this.state = {
      message: '',
      editmessage: '',
    };
  };
  
  componentDidMount(){
    let textarea = document.getElementsByClassName('ChatInput-textarea');
    textarea[0].addEventListener('keypress', (e) => {
      var key = e.which || e.keyCode;
      if(key === 13){
        //Enter is key 13
        e.preventDefault();
        this.props.onSubmitMessage(this.state.message)
        this.setState({ message: '' })
        }
    });
  }

  render() {
    return (
      <form
      id="Submit-form"
        className="ChatInput-form"
        onSubmit={e => {
          console.log(e)
          e.preventDefault()
          this.props.onSubmitMessage(this.state.message)
          this.setState({ message: '' })
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