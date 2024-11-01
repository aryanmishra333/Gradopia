// src/pages/UserPage.jsx
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const UserPage = () => {
    const { username } = useParams();
    const [user, setUser] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`/api/users/${username}`);
                setUser(res.data);
                setIsFollowing(res.data.isFollowing); // Use isFollowing from response
            } catch (err) {
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
            console.log(err);
        }
    };

    if (!user) return <div>Loading...</div>;
    const dateOfBirth = new Date(user.DateOfBirth);
    const formattedDate = dateOfBirth.toISOString().split('T')[0];

    return (
        <div>
            <h1>Name: {user.Username}</h1>
            <p>Email: {user.Email}</p>
            <p>Phone Number: {user.PhoneNumber}</p>
            <p>Date of Birth: {formattedDate}</p>
            <p>Role: {user.Role}</p>
            <p>Graduation Year: {user.GraduationYear}</p>
            <p>Current Job Title: {user.CurrentJobTitle}</p>
            <p>LinkedIn Profile: <a href={user.LinkedInProfile} target="_blank" rel="noopener noreferrer">{user.LinkedInProfile}</a></p>
            {currentUser && (
                <button 
                    onClick={handleFollow} 
                    style={{ backgroundColor: isFollowing ? 'grey' : 'blue' }}
                >
                    {isFollowing ? 'Unfollow' : 'Follow'}
                </button>
            )}
        </div>
    );
};

export default UserPage;
