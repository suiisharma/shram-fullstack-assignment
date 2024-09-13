import axios from 'axios';
import '../styles.LeaderBoard.styles.css';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import FullScreenLoadingSpinner from '../assets/spinner/loading_spinner';
import { REACT_APP_API_URL } from '../App';

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchLeaderBoardData = async () => {
        try {
            const response = await axios.get(`${REACT_APP_API_URL}/api/game/leaderboard`, {
                withCredentials: true,
            });
            const Leaderboard = await response.data;
            setLeaderboard(Leaderboard);
        } catch (error) {
            toast.error(error?.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { fetchLeaderBoardData(); }, [])

    if (loading) {
        return <FullScreenLoadingSpinner />;
    }

    return (
        <div className="leaderboard">
            <h2 className="title">Leaderboard</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th className="th">Rank</th>
                        <th className="th">Username</th>
                        <th className="th">Score</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboard.map((entry, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'evenRow' : ''}>
                            <td className="td">{index + 1}</td>
                            <td className="td">{entry.username}</td>
                            <td className="td">{entry.highestscore}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Leaderboard;
