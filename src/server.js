const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });
var clientList = [];
var chatHistory = []; 

wss.on('connection', function connection(ws) {
    
    wss.clients.forEach(function each(client) {
        // on Connect send the clientList and ChatHistory
        client.send(JSON.stringify({ action: "clientList", data: clientList}));
        client.send(JSON.stringify({ action: "chatHistory", data: chatHistory }));
    });

    ws.on('message', function incoming(data) {
        
        var userdata = JSON.parse(data);
        ws.personName = userdata.name;
        console.log("message", userdata);
        switch(userdata.action){
            case "userConnected":
                var loginMessage = {
                    action: "connection", 
                    name: "MessageBot", 
                    date: userdata.date, 
                    message: userdata.name +" Joined Chat",
                    edited: userdata.edited
                };
                clientList.push(ws.personName);
                chatHistory.push(loginMessage);
                wss.clients.forEach(function each(client) {
                    client.send(JSON.stringify({ action: "clientList", data: clientList}));
                    client.send(JSON.stringify({ action: "chatHistory", data: chatHistory }));
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
                            client.send(JSON.stringify({ action: "chatHistory", data: chatHistory }));
                        });
                    break;
                case "editmessage":
                        let i = userdata.mid;
                        let editMessage = {
                            action: "message", 
                            name: userdata.name, 
                            date: userdata.date, 
                            message: userdata.message,
                            edited: true
                        };
                        chatHistory[i] = editMessage
                        wss.clients.forEach(function each(client) {
                            client.send(JSON.stringify({ action: "chatHistory", data: chatHistory }));
                        });
                    break;
            default:
                // Handle all other requests
                wss.clients.forEach(function each(client){
                    client.send(JSON.stringify({ action: "error", data: "Unknown action command"}));
                });
                break;

        }
  });

  ws.on('close', function close(data){

    wss.clients.forEach(function each(client) {
        if(client !== ws && client.readyState === WebSocket.CLOSING){
            clientList = removeUserFromList(clientList, ws.personName);
            let userLeftMessage = {
                action: "connection", 
                name: "MessageBot",
                date: getDate(),
                message:  ws.personName + " Left Chat"
            };
            chatHistory.push(userLeftMessage);
    
            wss.clients.forEach(function each(client) {
                client.send(JSON.stringify({ action: "clientList", data: clientList }));
                client.send(JSON.stringify({ action: "chatHistory", data: chatHistory }));
            });
        }
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
    let currentDate = addZero(date.getHours())+ ":" + addZero(date.getMinutes()) + " " + addZero(date.getDate()) +" "+ months[date.getMonth()];
    return currentDate;
}

  /*         wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({
                    name: ws.personName,
                    message: data,}
                    ));
            }
        }); */