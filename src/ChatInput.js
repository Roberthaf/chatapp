import React, { Component } from 'react';
import "./ChatInput.css";

export default class ChatInput extends Component {
  constructor(props){
    super(props);
    this.state = {
      message: '',
      editmessage: '',
    };
  }
  

  render() {
    return (
      <form
        className="ChatInput-form"
        onSubmit={e => {
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
{/*         <input
          type="text"
          placeholder={'Enter message...'}
          value={this.state.message}
          onChange={e => this.setState({ message: e.target.value })}
        /> */}
        <input type="submit" value={'Send'} />
      </form>
    );
  }
}