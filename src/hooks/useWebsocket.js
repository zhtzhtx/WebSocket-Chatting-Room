import { useState, useLayoutEffect, useRef } from 'react'

function useWebsocket(url) {
    const [message, setMsg] = useState('');
    const ws = useRef(null)
    const sendMessage = (str: string) => {
        ws.current?.send(str)
    }
    useLayoutEffect(() => {
        if (!ws.current || ws.current.readyState === 3) {
            ws.current = new WebSocket(url)
            // 打开WebSocket连接后立刻发送一条消息:
            ws.current.addEventListener('open', () => {
                ws.current.send('欢迎加入聊天室！');
            });
            // 响应收到的消息:
            ws.current.addEventListener('message', (msgObj) => {
                let msg = msgObj.data + '\n'
                setMsg((m) => m + msg)
            })
        }
        return () => {
            console.log(1111)
            ws.current?.close()
        }
    }, [ws, url])
    return { message, sendMessage }
}

export default useWebsocket