import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from "prop-types";
import { REACT_APP_API_URL } from '../App';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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
    }, []);

    return (
        <UserContext.Provider value={{ user, loading, setUser, setLoading }}>
            {children}
        </UserContext.Provider>
    );
};

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};