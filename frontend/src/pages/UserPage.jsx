import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import { User, Briefcase, GraduationCap } from 'lucide-react';
import axios from 'axios';
import './UserPage.css';

const UserPage = () => {
    const { username } = useParams();
    const [user, setUser] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);
    const [error, setError] = useState(null);
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`/api/users/${username}`);
                setUser(res.data);
                setIsFollowing(res.data.isFollowing);
            } catch (err) {
                setError('Could not fetch user data. Please try again later.');
                console.log(err);
            }
        };
        fetchUser();
    }, [username, currentUser?.UserID]);

    const handleFollow = async () => {
        if (!currentUser) return;
        try {
            if (isFollowing) {
                await axios.post(`/api/users/unfollow`, { userId: user.UserID });
            } else {
                await axios.post(`/api/users/follow`, { userId: user.UserID });
            }
            setIsFollowing(!isFollowing);
        } catch (err) {
            setError('Could not update follow status. Please try again later.');
            console.log(err);
        }
    };

    if (error) return (
        <div className="user-page">
            <div className="error-message">
                {error}
            </div>
        </div>
    );

    if (!user) return (
        <div className="user-page">
            <div className="user-info animate-pulse">
                <div className="loading-bar"></div>
                <div className="loading-text"></div>
            </div>
        </div>
    );

    return (
        <div className="user-page">
            <div className="user-card">
                {/* Profile Picture and Name */}
                <div className="header-section">
                    <User size={48} className="user-icon" />
                    <h1 className="user-name">{user.Username}</h1>
                </div>

                {/* User Info Cards */}
                <div className="info-section">
                    {/* Role Card */}
                    <div className="info-item">
                        <Briefcase className="info-icon" />
                        <div>
                            <p className="info-label">Role</p>
                            <p className="info-value">{user.Role}</p>
                        </div>
                    </div>

                    {/* Graduation Year Card */}
                    <div className="info-item">
                        <GraduationCap className="info-icon" />
                        <div>
                            <p className="info-label">Graduation Year</p>
                            <p className="info-value">{user.GraduationYear}</p>
                        </div>
                    </div>

                    {/* Current Job Title Card */}
                    <div className="info-item">
                        <Briefcase className="info-icon" />
                        <div>
                            <p className="info-label">Current Job Title</p>
                            <p className="info-value">{user.CurrentJobTitle}</p>
                        </div>
                    </div>
                </div>

                {/* Follow Button */}
                {currentUser && (
                    <button 
                        onClick={handleFollow}
                        className={`follow-button ${isFollowing ? 'following' : ''}`}
                    >
                        {isFollowing ? 'Unfollow' : 'Follow'}
                    </button>
                )}
            </div>
        </div>
    );
};

export default UserPage;
