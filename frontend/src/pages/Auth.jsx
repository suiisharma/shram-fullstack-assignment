import { useContext, useState } from 'react';
import '../styles/auth.page.css';
import toast from 'react-hot-toast';
import axios from 'axios';
import { UserContext } from '../context/usercontext';
import { useNavigate } from 'react-router-dom';
import { REACT_APP_API_URL } from '../App';

const AuthPage = () => {
    const {setUser}=useContext(UserContext);
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate=useNavigate();

    const resetToDefault = () => {
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        return;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let User;
        if (!isLogin && password !== confirmPassword) {
            toast.error('Passwords do not match')
            resetToDefault();
            return;
        }
        if (isLogin) {
            try {
                const response= await axios.post(`${REACT_APP_API_URL}/api/auth/login`, {
                    username: username,
                    password: password
                }, {
                    headers: {
                        "Content-Type":
                            "application/json"
                    },
                    withCredentials: true
                });
                toast.success("User logged In successfully!");
                User=await response.data;
                setUser(User);
                navigate('/',{replace:true});
            } catch (error) {
                toast.error(error?.response?.data?.msg||error.message);
            }
        } else {
                try {
                    const response=await axios.post(`${REACT_APP_API_URL}/api/auth/register`, {
                        username: username,
                        password: password
                    }, {
                        headers: {
                            "Content-Type":
                                "application/json"
                        },
                        withCredentials: true
                    });
                    toast.success("Registration successful!");
                    User=await response.data;
                    setTimeout(()=>{setUser(User)},1000);
                    navigate('/',{replace:true});
                } catch (error) {
                    toast.error(error?.response?.data?.msg||error.message);
                }
        }
    };

    return (
        <div className="container">
            <form className="form" onSubmit={handleSubmit}>
                <h2 className="title">{isLogin ? 'Login' : 'Register'}</h2>
                <input
                    className="input"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    className="input"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {!isLogin && (
                    <input
                        className="input"
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                )}
                <button
                    className="button"
                    type="submit"
                    onMouseEnter={(e) => e.target.classList.add('buttonHover')}
                    onMouseLeave={(e) => e.target.classList.remove('buttonHover')}
                >
                    {isLogin ? 'Login' : 'Register'}
                </button>
            </form>
            <div className="switchMode">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                    className="switchButton"
                    onClick={() => {
                        setIsLogin(!isLogin);
                    }}
                >
                    {isLogin ? 'Register' : 'Login'}
                </button>
            </div>
        </div>
    );
};


export default AuthPage;
