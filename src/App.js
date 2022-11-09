import { useState } from 'react'
import './App.css';
import useWebsocket from './hooks/useWebsocket';


function App() {
  const { message, sendMessage } = useWebsocket('ws://localhost:8000/')
  
  const [inputMsg, setInputMsg] = useState('')
  const setInput = (e) => {
    const value = e.target.value
    setInputMsg(value)
  }
  const sendMsg = () => {
    sendMessage(inputMsg)
    setInputMsg('')
  }
  return (
    <div className="App">
      <div className="chat-room">
        <h1>欢迎来到聊天室</h1>
        <div className="chat-area">
          <textarea readOnly="readonly" value={message}></textarea>
        </div>
        <div className="input-area">
          <textarea value={inputMsg} onChange={setInput}></textarea>
          <div className="input-button">
            <button onClick={sendMsg}>发送</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
