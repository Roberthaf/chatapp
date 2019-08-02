import React from 'react';
import './App.css';
import Chat from './Chat';
import Lobby from './Lobby';
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

  getDate = () => {
    let date = new Date();
    function addZero(i) {
        if (i < 10) {
          i = "0" + i;
        }
        return i;
    };
    
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let currentDate = addZero(date.getDate()) +" "+ months[date.getMonth()] + " " + addZero(date.getHours())+ ":" + addZero(date.getMinutes());
    return currentDate;
  }

  render() {
    const {name} = this.state;
    
    return (
      <div className="App">
          <header className="App-header">
            <h1 className="App-title">Welcome to ChatApp</h1>
          </header>
          {
            this.state.isLoggedIn ?
            <div className="Main-container Clearfix">
              <div className="Lobby-container">
                <Lobby 
                  name={name}
                  getDate={this.getDate}
                />                
              </div>
              <div className="Chat-container">
                <Chat 
                  name={name}
                  getDate={this.getDate}
                />
              </div>
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
