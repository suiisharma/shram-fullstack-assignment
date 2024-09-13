import '../styles/Home.css';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { useContext, useEffect } from 'react';
import { UserContext } from '../context/usercontext';
import FullScreenLoadingSpinner from '../assets/spinner/loading_spinner';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { REACT_APP_API_URL } from '../App';

const HomePage = () => {
  const { user, loading,setLoading,setUser} = useContext(UserContext);

  useEffect(()=>{
    const fetchUser = async () => {
      try {
          const response = await axios.get(`${REACT_APP_API_URL}/api/auth/me`, { withCredentials: true });
          setUser(response.data.user);
      } catch (error) {
          console.error("Failed to fetch user:", error);
          setUser(null);
      } finally {
          setLoading(false);
      }
  };

  fetchUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);


  if (loading) {
    return <FullScreenLoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/auth" replace={true} />;
  }

  const quotes = [
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill",
    "Believe you can and you're halfway there. - Theodore Roosevelt",
    "The mind is everything. What you think you become. - Buddha",
    "The best way to predict the future is to create it. - Peter Drucker",
  ];


  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  const chartData = {
    labels: user.scores ? user.scores.map((_, i) => `Game ${i + 1}`) : [],
    datasets: [
      {
        label: 'Past Game Scores',
        data: user.scores || [],
        fill: false,
        borderColor: '#4CAF50',
        backgroundColor: '#4CAF50',
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="homePage">
      <h1 className="title">Welcome to Memory Master</h1>
      <p className="welcome-message">Hello, {user.username || 'Guest'}! Glad to have you back!</p>
      <p className="quote">{randomQuote}</p>

      <div className="statsContainer">
        <div className="stat">
          <div className="statTitle">All-Time High Score</div>
          <div className="statValue">{user.highestscore || 0}</div>
        </div>
        <div className="stat">
          <div className="statTitle">Total Games Played</div>
          <div className="statValue">{user.scores ? user.scores.length : 0}</div>
        </div>
      </div>

      <div className="chart-container">
        <div className="chart">
        <Line data={chartData}   />
        </div> 
      </div>
    </div>
  );
};

export default HomePage;
