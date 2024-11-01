// Header.jsx
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const Header = () => {
    const { currentUser, logout } = useContext(AuthContext);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery) {
            navigate(`/user/${searchQuery}`); // Navigate to user page
            setSearchQuery(''); // Clear the input field
        }
    };

    return (
        <header>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/dashboard">Dashboard</Link>
                {currentUser && (
                    <>
                        <Link to="/profile">Profile</Link>
                        <form onSubmit={handleSearch} style={{ display: 'inline' }}>
                            <input 
                                type="text" 
                                value={searchQuery} 
                                onChange={(e) => setSearchQuery(e.target.value)} 
                                placeholder="Search User..." 
                            />
                            <button type="submit">Search</button>
                        </form>
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
