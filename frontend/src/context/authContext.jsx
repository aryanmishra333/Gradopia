import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(() => {
        // Initialize currentUser from localStorage, if available
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const login = async (input) => {
        try {
            const res = await axios.post('/api/auth/login', input);
            setCurrentUser(res.data);
            return res.data; // Return the response
        } catch (error) {
            console.error("Login error: ", error);
            throw error; // Rethrow for handling in Login component
        }
    };

    const logout = async () => {
        try {
            await axios.post('/api/auth/logout');
            setCurrentUser(null);
        } catch (error) {
            console.error("Logout error: ", error);
        }
    };

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(currentUser));
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
