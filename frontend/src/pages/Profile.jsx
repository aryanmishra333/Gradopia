import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/authContext'; // Adjust the import path as needed

const Profile = () => {
    const { currentUser } = useContext(AuthContext); // Access currentUser from AuthContext

    return (
        <div>
            <h2>User Profile</h2>
            {currentUser ? (
                <div>
                    <p><strong>Username:</strong> {currentUser.Username || 'N/A'}</p>
                    <p><strong>Email:</strong> {currentUser.Email || 'N/A'}</p>
                    <p><strong>Phone Number:</strong> {currentUser.PhoneNumber || 'N/A'}</p>
                    <p><strong>Date of Birth:</strong> {currentUser.DateOfBirth ? new Date(currentUser.DateOfBirth).toLocaleDateString() : 'N/A'}</p>
                    <p><strong>Role:</strong> {currentUser.Role || 'N/A'}</p>
                    <p><strong>Graduation Year:</strong> {currentUser.GraduationYear || 'N/A'}</p>
                    <p><strong>Current Job Title:</strong> {currentUser.CurrentJobTitle || 'N/A'}</p>
                    <p><strong>LinkedIn Profile:</strong> <a href={currentUser.LinkedInProfile} target="_blank" rel="noopener noreferrer">{currentUser.LinkedInProfile || 'N/A'}</a></p>

                    {/* Link to New Post page */}
                    <Link to="/news-post">
                        <button style={{ marginTop: '10px' }}>Create News Post</button>
                    </Link>
                </div>
            ) : (
                <p>Please log in to view your profile details.</p>
            )}
        </div>
    );
};

export default Profile;
