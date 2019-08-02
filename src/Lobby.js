import React from 'react';
import './Lobby.css';

const URL = 'ws://10.75.53.114:8080';

export default class Lobby extends React.PureComponent{
    constructor(props){
        super(props)
        this.state = {
            clients : []  
        };
    };
   
    ws = new WebSocket(URL);


    render(){
        return(
            <div className="lobbyContainer">
                <div className="lobbyHeader">
                    <p>Users In Lobby</p>
                </div>
                <div className="userList">
                
                {
                    this.state.clients.map( (client, index) => <p key={index}> {client}</p> )
                }
                </div>
            </div>
        );
    }
}