import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import './UserPage.css'; // Importing CSS for styles

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
        if (!currentUser) return; // Ensure the user is logged in
        try {
            if (isFollowing) {
                await axios.post(`/api/users/unfollow`, { userId: user.UserID });
            } else {
                await axios.post(`/api/users/follow`, { userId: user.UserID });
            }
            setIsFollowing(!isFollowing); // Toggle following state
        } catch (err) {
            setError('Could not update follow status. Please try again later.');
            console.log(err);
        }
    };

    if (error) return <div className="error-message">{error}</div>;
    if (!user) return <div>Loading...</div>;

    const dateOfBirth = new Date(user.DateOfBirth);
    const formattedDate = dateOfBirth.toLocaleDateString();

    return (
        <div className="user-page">
            <h1>{user.Username}</h1>
            <div className="user-info">
                <p><strong>Email:</strong> {user.Email}</p>
                <p><strong>Phone Number:</strong> {user.PhoneNumber}</p>
                <p><strong>Date of Birth:</strong> {formattedDate}</p>
                <p><strong>Role:</strong> {user.Role}</p>
                <p><strong>Graduation Year:</strong> {user.GraduationYear}</p>
                <p><strong>Current Job Title:</strong> {user.CurrentJobTitle}</p>
                <p>
                    <strong>LinkedIn Profile:</strong> 
                    <a href={user.LinkedInProfile} target="_blank" rel="noopener noreferrer">
                        {user.LinkedInProfile}
                    </a>
                </p>
                {currentUser && (
                    <button 
                        onClick={handleFollow} 
                        className={isFollowing ? 'follow-button following' : 'follow-button'}
                    >
                        {isFollowing ? 'Unfollow' : 'Follow'}
                    </button>
                )}
            </div>
        </div>
    );
};

export default UserPage;
