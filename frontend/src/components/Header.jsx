import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const Header = () => {
    const { currentUser, logout } = useContext(AuthContext);

    return (
        <header>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/dashboard">Dashboard</Link>
                {currentUser && (
                    <>
                        <Link to="/profile">Profile</Link> {/* Profile link for logged-in users */}
                        <button 
                            onClick={logout} 
                            style={{ marginLeft: '15px', cursor: 'pointer' }}
                        >
                            Logout
                        </button>
                    </>
                )}
                {!currentUser && (
                    <>
                        <Link to="/register">Register</Link>
                        <Link to="/login">Login</Link>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;
