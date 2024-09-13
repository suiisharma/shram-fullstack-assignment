import { useState, useEffect, useContext, useRef } from 'react';
import '../styles/game.styles.css';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { UserContext } from '../context/usercontext';
import axios from 'axios';
import '../styles/glow.styles.css'; 
import { REACT_APP_API_URL } from '../App';

// Constants
const CARD_PAIRS = 10; // Total number of pairs of cards that will appear on screen
const CARDS = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🐦', '🐤', '🐣', '🐺', '🦄', '🐝', '🐛', '🦋', '🐌', '🐞', '🐜', '🦟', '🦗', '🕷', '🦂', '🐢', '🐍', '🦎', '🦖', '🦕', '🐙', '🦑', '🦐', '🦞', '🦀', '🐡', '🐠', '🐟', '🐬', '🐳', '🐋', '🦈', '🐊', '🐅', '🐆', '🦓', '🦍', '🦧', '🐘', '🦛', '🦏', '🐪', '🐫', '🦒', '🦘', '🦥', '🦦', '🦨', '🦡', '🐁', '🐀', '🐿', '🦔']; // Card emojis

const MemoryGame = () => {
    // State variables
    const { setUser, user } = useContext(UserContext);
    const [cards, setCards] = useState([]); // Array of card objects
    const [flipped, setFlipped] = useState([]); // Array of flipped card IDs
    const [solved, setSolved] = useState([]); // Array of solved card IDs
    const [score, setScore] = useState(0); // Current score
    const [attempt, setAttempt] = useState(0); // Current attempt
    const [gameover, setGameOver] = useState(false); // Game over state
    const [highScore, setHighScore] = useState(user.highestscore || 0); // High score
    const [showCongrats, setShowCongrats] = useState(false); // Show congratulations message
    const { width, height } = useWindowSize();
    const apiCalled = useRef(false); // Ref to track if API call has been made
    const [nearHighScore, setNearHighScore] = useState(false); // Special effect state

    // Initialize the game on component mount
    useEffect(() => {
        initializeGame();
    }, []);
    useEffect(() => {
        const scoreBoard = document.querySelector('.scoreBoard');
        if (scoreBoard) {
            if (score >= highScore - 20 && score < highScore) {
                scoreBoard.classList.add('glow');
            } else if (score >= highScore) {
                scoreBoard.classList.add('intenseGlow');
            } else {
                scoreBoard.classList.remove('glow', 'intenseGlow');
            }
        }
    }, [score, highScore]);

    // Function to initialize the game
    const initializeGame = () => {
        // Shuffle and duplicate cards
        CARDS.sort(() => Math.random() - 0.5);
        const shuffledCards = CARDS.slice(0, CARD_PAIRS)
            .concat(CARDS.slice(0, CARD_PAIRS))
            .sort(() => Math.random() - 0.5)
            .map((card, index) => ({ id: index, content: card }));

        // Set initial state
        setCards(shuffledCards);
        setFlipped([]);
        setSolved([]);
        setScore(0);
        setAttempt(0);
        setShowCongrats(false);
        setGameOver(false);
        apiCalled.current = false; // Reset API call tracker
        setNearHighScore(false); // Reset near high score state
    };

    // Handle card click event
    const handleCardClick = (id) => {
        // Ignore clicks if two cards are already flipped or card is already solved
        if (solved.includes(id)) return;

        // Add card to flipped array
        const newFlipped = [...flipped, id];
        setFlipped(newFlipped);
        setAttempt(attempt + 1);
        // Check if two cards are flipped
        if (newFlipped.length === 2) {
            const [first, second] = newFlipped;
            // Check if cards match
            if (cards[first].content === cards[second].content) {
                setSolved([...solved, first, second]);
                setFlipped([]);
                setScore(score + Math.max(0, 12 - attempt));
                setAttempt(0);
            } else {
                // Reset flipped cards after a delay
                setTimeout(() => setFlipped([]), 300);
            }
        }
    };

    const handleScoreUpdate = async () => {
        if (score && !apiCalled.current) {
            apiCalled.current = true; // Mark API call as made
            try {
                const response = await axios.post(`${REACT_APP_API_URL}/api/game/score`, { score }, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true
                });
                let val = await response.data;
                console.log({ val });

                // Update the user state correctly
                setUser(prevUser => ({
                    ...prevUser,
                    highestscore: val.highScore,
                    scores: val.scores
                }));
            } catch (error) {
                console.error('Error updating score:', error);
            }
        }
    };

    // Check if all cards are solved
    useEffect(() => {
        if (solved.length === cards.length && cards.length > 0) {
            handleScoreUpdate().then(() => {
                if (score > highScore) {
                    setHighScore(score);
                    setShowCongrats(true);
                    setGameOver(false);
                } else {
                    setGameOver(true);
                }
            });
        }

        // Trigger special effect when close to high score
        if (highScore - score <= 5 && highScore - score > 0) {
            setNearHighScore(true);
        } else {
            setNearHighScore(false);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [solved, cards, score, highScore]);

    return (
        <div className={`container ${nearHighScore ? 'nearHighScoreEffect' : ''}`}>
            <h1 className="title">Memory Card Game</h1>
            <div className="scoreBoard">
                <p>Score: {score}</p>
                <p>High Score: {highScore}</p>
            </div>
            {showCongrats && (
                <div className="congrats">
                    <p>Congratulations! You&apos;ve set a new high score!</p>
                </div>
            )}
            {showCongrats && <Confetti width={width} height={height} />}
            {gameover && !showCongrats && (
                <div className="gameover">
                    <p>Game Over! Try again to beat the high score!</p>
                </div>
            )}
            <div className="grid">
                {cards.map((card) => (
                    <div
                        key={card.id}
                        className={`card ${flipped.includes(card.id) || solved.includes(card.id) ? 'cardFlipped' : ''}`}
                        onClick={() => handleCardClick(card.id)}
                    >
                        {flipped.includes(card.id) || solved.includes(card.id) ? card.content : '?'}
                    </div>
                ))}
            </div>
            <button
                className="newGameButton"
                onClick={initializeGame}
            >
                New Game
            </button>
        </div>
    );
};

export default MemoryGame;
