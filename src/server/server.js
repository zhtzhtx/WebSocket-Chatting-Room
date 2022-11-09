// 引入 NodeJS 自带的 WebSocket 模块
const WebSocket = require('ws')
const express = require('express');
const app = express();

// 获取生成 WebSocket 实例的方法
const WebSocketServer = WebSocket.Server

// 监听 8000 端口
const server = app.listen(8000, () => console.log('Example app listening on port 8000!'));

// 生成 WebSocket 实例，传入服务信息
const wss = new WebSocketServer({
    server
})

// 在 WebSocketServer 中，需要响应 connection 事件
wss.on('connection', function (ws, req) {
    // ws 为 WebSocketServer 的实例，req 为请求信息
    // 当客户端发送数据时，需要响应 message 事件
    ws.on('message', function (message) {
        message = message.toString('utf8')
        // wss.clients 获取所有已请求的浏览器信息
        wss.clients.forEach(client => {
            client.send(message)
        })
    })
});
