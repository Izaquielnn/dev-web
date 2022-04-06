import logo from './logo.svg';
import './App.css';
import Feed from './pages/Feed/Feed';
import Header from './pages/Header/Header';
import CreatePostModal from './pages/CreatePost/CreatePost';
import { Routes, Route } from "react-router-dom";
import Login from './pages/Login/Login';
import SingUp from './pages/SingUp/SingUp';
import { useEffect } from 'react';

function App() {
  return (
    <div className="App">

      <Routes>
        <Route path="/" element={
          <>
            <Header />
            <Feed className="Feed"></Feed>
          </>
        } />
        <Route path="create" element={<CreatePostModal />} />
        <Route path="login" element={<Login />} />
        <Route path="singup" element={<SingUp />} />
      </Routes>

    </div>
  );
}

export default App;
