// src/components/Header.jsx
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import './Header.css'; // Import the CSS file for other styles

const Header = () => {
    const { currentUser, logout } = useContext(AuthContext);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery) {
            navigate(`/user/${searchQuery}`);
            setSearchQuery('');
        }
    };

    return (
        <header className="header">
            <nav className="nav">
                <div className="nav-left">
                    <Link to="/" className="nav-logo">Gradopia</Link>
                </div>
                <div className="nav-center">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/dashboard" className="nav-link">Dashboard</Link>
                    {currentUser && <Link to="/profile" className="nav-link">Profile</Link>}
                </div>
                <div className="nav-right">
                    {currentUser ? (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <form onSubmit={handleSearch} className="search-form" style={{ display: 'flex', marginRight: '20px' }}>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search User..."
                                    className="search-input"
                                    style={{
                                        width: '250px', // Adjust width as necessary
                                        padding: '10px',
                                        fontSize: '1rem',
                                        borderRadius: '5px 0 0 5px', // Rounded left corners
                                        border: '1px solid #ccc' // Light border
                                    }}
                                />
                                <button type="submit" className="search-button" style={{ border: 'none', backgroundColor: '#0056b3', color: '#fff', borderRadius: '0 5px 5px 0', padding: '10px 15px' }}>
                                    🔍
                                </button>
                            </form>
                            <button onClick={logout} style={{
                                padding: '10px 15px',
                                border: 'none',
                                backgroundColor: '#a11f1f',
                                color: '#fff',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s',
                            }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#c82333'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#a11f1f'}>
                                Logout
                            </button>
                        </div>
                    ) : (
                        <>
                            <Link to="/register" className="nav-link">Register</Link>
                            <Link to="/login" className="nav-link">Login</Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
