import React from 'react';
import './Lobby.css';

const URL = 'ws://192.168.2.114:8080';

export default class Lobby extends React.PureComponent{
    constructor(props){
        super(props)
        this.state = {
            clients : []  
        };
    };
   
    ws = new WebSocket(URL);
    sendData = (action, name, date, data) => {
        // Create a sting to send that will be our lobby connect, disconnect and other data
        const outbound = {"action": action, "name": name, "date": date, "message": data };
        
        this.ws.send(JSON.stringify(outbound));
    }

    addToClientList = (event) => {
        let user = JSON.parse(event.data)
        this.setState({ clients: user.data })
    }

    componentDidMount() {
        const { name, getDate } = this.props;
        
        this.ws.onopen =  (ws) => {
            // on connecting, do nothing but log it to the console
            //console.log("Connected");
            let date = getDate();
            
            this.sendData("userConnected", name, date, " Joined Chat" );
        }

        this.ws.onmessage = event => {
            // on receiving a message, add it to the list of messages
            //console.log("message" ,event);
            let data = JSON.parse(event.data);
            //console.log(client);
            switch (data.action) {
                case "userConnected":
                    //Do nothing for now
                    break;
                case "clientList":
                    this.addToClientList(event)
                    break;
                default:
                    break;
            }

        }
    this.ws.onclose = event => {
            //let {getDate} = this.props;
            //let date = getDate();
            
            //this.sendData("userDisconnectd", name, date, " left chat." );
            // automatically try to reconnect on connection loss
            this.setState({
                ws: new WebSocket(URL),
            });
            
        }
    }

    render(){
        return(
            <div>
                <div className="Lobby-header">
                    <h3 className="Lobby-header-text">Users In Lobby</h3> 
                </div>
                <div className="User-list">
                    <ul>
                    { // Change to a list maybe
                        this.state.clients.map( (client, index) => <li key={index}> {client}</li> )
                    }    
                    </ul>
                
                </div>
            </div>
        );
    }
}