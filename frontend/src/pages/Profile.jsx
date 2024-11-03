// src/components/Profile.jsx
import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import './Profile.css';

const Profile = () => {
    const { currentUser } = useContext(AuthContext);
    const [showBioModal, setShowBioModal] = useState(false);
    const [bio, setBio] = useState('');
    const [address, setAddress] = useState('');
    const [message, setMessage] = useState('');
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/profiles/${currentUser.id}`, {
                    credentials: 'include'
                });
                if (response.ok) {
                    const data = await response.json();
                    setProfileData(data);
                    setBio(data.Bio || '');
                    setAddress(data.Address || '');
                }
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };

        if (currentUser) {
            fetchProfileData();
        }
    }, [currentUser]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/profiles/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ bio, address })
            });

            if (response.ok) {
                const data = await response.json();
                setMessage('Profile updated successfully!');
                setShowBioModal(false);
                setProfileData(prev => ({
                    ...prev,
                    Bio: bio,
                    Address: address
                }));
            } else {
                const error = await response.json();
                setMessage(error.message || 'Error updating profile');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Error connecting to server');
        }
    };

    return (
        <div className="profile-container">
            <h2>User Profile</h2>
            {currentUser ? (
                <div className="profile-card">
                    <div className="profile-info">
                        <p><strong>Username:</strong> {currentUser.Username || 'N/A'}</p>
                        <p><strong>Email:</strong> {currentUser.Email || 'N/A'}</p>
                        <p><strong>Phone Number:</strong> {currentUser.PhoneNumber || 'N/A'}</p>
                        <p><strong>Date of Birth:</strong> {currentUser.DateOfBirth ? new Date(currentUser.DateOfBirth).toLocaleDateString() : 'N/A'}</p>
                        <p><strong>Role:</strong> {currentUser.Role || 'N/A'}</p>
                        <p><strong>Graduation Year:</strong> {currentUser.GraduationYear || 'N/A'}</p>
                        <p><strong>Current Job Title:</strong> {currentUser.CurrentJobTitle || 'N/A'}</p>
                        <p>
                            <strong>LinkedIn Profile:</strong> 
                            <a href={currentUser.LinkedInProfile} target="_blank" rel="noopener noreferrer">
                                {currentUser.LinkedInProfile || 'N/A'}
                            </a>
                        </p>
                    </div>

                    <div className="bio-address-section">
                        <p><strong>Bio:</strong> {profileData?.Bio || 'No bio added yet'}</p>
                        <p><strong>Address:</strong> {profileData?.Address || 'No address added yet'}</p>
                    </div>

                    <div className="button-group">
                        <Link to="/news-post">
                            <button className="profile-button">Create News Post</button>
                        </Link>
                        <Link to="/jobs-post">
                            <button className="profile-button">Post Job</button>
                        </Link>
                        <Link to="/events-post">
                            <button className="profile-button">Post Event</button>
                        </Link>
                        <button 
                            className="profile-button"
                            onClick={() => setShowBioModal(true)}
                        >
                            Update Bio & Address
                        </button>
                    </div>
                </div>
            ) : (
                <p>Please log in to view your profile details.</p>
            )}

            {showBioModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Update Bio & Address</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Bio:</label>
                                <textarea
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    rows="4"
                                    placeholder="Enter your bio..."
                                />
                            </div>
                            <div className="form-group">
                                <label>Address:</label>
                                <textarea
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    rows="2"
                                    placeholder="Enter your address..."
                                />
                            </div>
                            <div className="modal-buttons">
                                <button type="submit" className="profile-button">Save</button>
                                <button 
                                    type="button" 
                                    className="profile-button cancel"
                                    onClick={() => setShowBioModal(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                        {message && <p className="message">{message}</p>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
