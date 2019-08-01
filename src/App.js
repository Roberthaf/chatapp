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

  render() {
  const {name} = this.state;
  return (
    <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to ChatApp</h1>
        </header>

    </div>
  );
}
}
