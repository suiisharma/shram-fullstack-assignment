import { Route, Routes, Navigate } from 'react-router-dom';
import Nav from './components/Navbar';
import './styles/App.css';
import AuthPage from './pages/Auth';
import MemoryGame from './components/Game';
import Leaderboard from './pages/LeaderBoard';
import Home from "./pages/Home.jsx";
import { useContext } from 'react';
import { UserContext } from './context/usercontext.jsx';



export const REACT_APP_API_URL="https://shram-backend-xhw8.onrender.com";

const App = () => {
  const {user}=useContext(UserContext);
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/auth" element={user ? <Navigate to="/" replace /> : <AuthPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/play" element={user ? <MemoryGame /> : <Navigate to="/auth" replace />} />
        <Route path="/leaderboard" element={user ? <Leaderboard /> : <Navigate to="/auth" replace />} />
        <Route path="*" element={<Navigate to={user ? "/" : "/auth"} replace />} />
      </Routes>
    </div>
  );
};

export default App;
