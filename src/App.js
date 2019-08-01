import React from 'react';
import './App.css';
import Chat from './Chat';
import Login from './Login';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn : false,
      name: '',
    };
  };

  handleLogin = (authenticated, username) => {
    this.setState({ 
      isLoggedIn: authenticated,
      name: username
    });
  }
  
  render() {
    const {name} = this.state;
    return (
      <div className="App clearfix">
          <header className="App-header">
            <h1 className="App-title">Welcome to ChatApp</h1>
          </header>
          {
            this.state.isLoggedIn ?
            <div>
            <div className="Lobby-container"></div>
            <div className="Chat-container"></div>
            </div>
            :
            <Login 
              handleLogin={this.handleLogin}
            />
          }
      </div>
    );
  }
}
