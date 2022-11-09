import { useState, useLayoutEffect, useRef } from 'react'

function useWebsocket(url) {
    // 用于缓存 WebSocket 实例
    const ws = useRef(null)
    // 用于接收服务端传递的内容
    const [message, setMsg] = useState('');
    // 发送
    const sendMessage = (msg) => {
        ws.current?.send(msg)
    }
    useLayoutEffect(() => {
        // 判断 WebSocket 实例是否存在，如果存在避免重复创建
        if (!ws.current || ws.current.readyState === 3) {
            // 缓存 WebSocket 实例
            ws.current = new WebSocket(url)
            // 建立 WebSocket 连接后立刻发送一条消息:
            ws.current.addEventListener('open', () => {
                ws.current.send('欢迎 React User 加入聊天室！');
            });
            // 响应收到的消息:
            ws.current.addEventListener('message', (msgObj) => {
                let msg = msgObj.data + '\n'
                setMsg((m) => m + msg)
            })
            // 关闭 WebSocket 连接后立刻发送一条消息:
            ws.current.addEventListener('close', () => {
                ws.current.send('React User 已退出聊天室');
            });
        }
        return () => {
            // 卸载组件时，关闭 WebSocket 连接
            ws.current?.close()
        }
    }, [ws, url])
    return { message, sendMessage }
}

export default useWebsocket