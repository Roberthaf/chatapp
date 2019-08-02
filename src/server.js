const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });
var clientList = [];
var chatHistory = []; 

wss.on('connection', function connection(ws) {
    
    wss.clients.forEach(function each(client) {
        // on Connect send the clientList and ChatHistory
        client.send(JSON.stringify({ action: "clientList", data: clientList}));
        client.send(JSON.stringify({ action: "chatHistroy", data: chatHistory }));
    });

    ws.on('message', function incoming(data) {
        console.log("message", data);
        var userdata = JSON.parse(data);
        ws.personName = userdata.name;

        switch(userdata.action){
            case "userConnected":
                var newMessage = {
                    action: "message", 
                    name: userdata.name, 
                    date: userdata.date, 
                    message: userdata.message,
                    edited: userdata.edited
                };
                clientList.push(ws.personName);
                chatHistory.push(newMessage);
                wss.clients.forEach(function each(client) {
                    client.send(JSON.stringify({ action: "clientList", data: clientList}));
                    client.send(JSON.stringify({ action: "chatHistroy", data: chatHistory }));
                });
                break;
                case "message":
                        var message = {
                            action: "message", 
                            name: userdata.name, 
                            date: userdata.date, 
                            message: userdata.message,
                            edited: userdata.edited
                        };
                        chatHistory.push(message);
                        wss.clients.forEach(function each(client) {
                            client.send(JSON.stringify({ action: "chatHistroy", data: chatHistory }));
                        });
                    break;
            default:
                // Handle all other requests
                wss.clients.forEach(function each(client){
                    client.send(JSON.stringify({ action: "error", data: "Unknown action command"}));
                });
                break;

        }
/*         wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({
                    name: ws.personName,
                    message: data,}
                    ));
            }
        }); */

  });

  ws.on('close', function close(data){
    wss.clients.forEach(function each(client) {
        clientList = removeUserFromList(clientList, ws.personName);
        let userLeftMessage = {
            action: "message", 
            name: ws.personName,
            date: getDate(),
            message: " Left chat."
        };
        chatHistory.push(userLeftMessage);

        wss.clients.forEach(function each(client) {
            client.send(JSON.stringify({ action: "clientList", data: clientList }));
            client.send(JSON.stringify({ action: "chatHistroy", data: chatHistory }));
        });
    });
  });
});


function removeUserFromList(array, user) {
    let newClientList = array.filter(e => e !== user);
    return newClientList;
}

function getDate(){
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

/*
else{
            //console.log("WebSocket is closing")
            if(ws.personName){ // If the user force closes the browser
                clientList = removeUserFromList(clientList, ws.personName);
                wss.clients.forEach(function each(client) {
                    client.send(JSON.stringify({ action: "clientList", data: clientList }));
                    //client.send(JSON.stringify({ action: "userDisconnected", name: ws.personName,  message: ws.personName + "left chat." } ));
                });
            }
        }
*/