import logo from './logo.svg';
import './App.css';
import Feed from './pages/Feed/Feed';
import Header from './pages/Header/Header';
import CreatePostModal from './pages/CreatePost/CreatePost';
import { Routes, Route } from "react-router-dom";

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
      </Routes>

    </div>
  );
}

export default App;
