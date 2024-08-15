import './App.css';
import RoomPage from './components/RoomPage';
import ChatPage from './components/ChatPage';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
            <Route path="/" element={<RoomPage />}/>
            <Route path="/chat/:topicId" element={<ChatPage />}/>
    </Routes>
  );
}

export default App;
