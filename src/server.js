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
                let newMessage = {
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
        if(client !== ws && client.readyState === WebSocket.CLOSING){
            //console.log("WebSocket is closing")
            clientList = removeUserFromList(clientList, ws.personName);
            wss.clients.forEach(function each(client) {
                client.send(JSON.stringify({ action: "clientList", data: clientList }));

                //client.send(JSON.stringify({ action: "userDisconnected", name: ws.personName,  message: ws.personName + "left chat." } ));
            });
        }else{
            //console.log("WebSocket is closing")
            if(ws.personName){ // If the user force closes the browser
                clientList = removeUserFromList(clientList, ws.personName);
                wss.clients.forEach(function each(client) {
                    client.send(JSON.stringify({ action: "clientList", data: clientList }));
                    //client.send(JSON.stringify({ action: "userDisconnected", name: ws.personName,  message: ws.personName + "left chat." } ));
                });
            }
        }
    });
  });
});


function removeUserFromList(array, user) {
    let newClientList = array.filter(e => e !== user);
    return newClientList;
}