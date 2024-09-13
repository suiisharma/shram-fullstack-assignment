import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/usercontext";
import { REACT_APP_API_URL } from "../App";

const Nav = () => {
    let navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            await axios.get(`${REACT_APP_API_URL}/api/auth/logout`, {
                withCredentials: true
            });
            await setUser(null);
            navigate('/auth', { replace: true });
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    if (!user) {
        return null; 
    }

    return (
        <nav className="nav">
            <Link to="/" className="navLink">Home</Link>
            <Link to="/play" className="navLink">Play</Link>
            <Link to="/leaderboard" className="navLink">Leaderboard</Link>
            <div className="navLink" onClick={handleLogout}>Logout</div>
        </nav>
    );
};

export default Nav;