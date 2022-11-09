const WebSocket = require('ws')
const express = require('express');
const app = express();


const WebSocketServer = WebSocket.Server

const server = app.listen(8000, () => console.log('Example app listening on port 8000!'));

const wss = new WebSocketServer({
    server
})

wss.on('connection', function (ws, req) {
    ws.on('message', function (message) {
        message = message.toString('utf8')
        wss.clients.forEach(client => {
            client.send(message)
        })
    })
});
