import './App.css';
import useWebsocket from './hooks/useWebsocket';


function App() {
  const { message,sendMessage }= useWebsocket('ws://localhost:8000/test')
  return (
    <div className="App">
      <div className="chat-room">
        <h1>欢迎来到聊天室</h1>
        <div className="chat-area">
          <textarea readOnly="readonly" value={message}></textarea>
        </div>
        <div className="input-area">
          <textarea></textarea>
          <div className="input-button">
            <button onClick={()=>sendMessage('1111')}>发送</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
