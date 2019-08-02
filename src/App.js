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
    console.log(date.getDay());
    return currentDate;
  }

  render() {
    const {name} = this.state;
    console.log(this.getDate());
    return (
      <div className="App">
          <header className="App-header">
            <h1 className="App-title">Welcome to ChatApp</h1>
          </header>
          {
            this.state.isLoggedIn ?
            <div className="Main-container clearfix">
              <div className="Lobby-container">
              
              </div>
              <div className="Chat-container">
              
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
