import { Routes, Route } from "react-router-dom";
import Footer from "./footer/Footer";
import Login from "./login/Login";
import Chat from "./chat/Chat";
import "./App.css";
import Register from "./register/Register";
function App() {
  return (
    <>
      <Routes>
        <Route path="/main" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
