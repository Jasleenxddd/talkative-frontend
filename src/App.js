import "./App.css";
import Homepage from "./Pages/Homepage"; // Correctly import the Homepage component
import ChatPage from "./Pages/ChatPage"; // Correctly import the Chatpage component
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatProvider from "./Context/ChatProvider";

function App() {
  return (
    
    <div className="App">
      <ChatProvider>
      <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/chats" element={<ChatPage />} /> 
        </Routes>
      </ChatProvider>
        
      
    </div>
    
  );
}

export default App;
