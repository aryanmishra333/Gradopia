// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import './Home.css'; // Importing CSS file for styles

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('/api/home');
                setPosts(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error fetching posts: {error}</div>;

    return (
        <div className="home-page">
            <header className="header">
                <p className="main-title">Connect with your alumni and stay updated with latest news, events, and job postings.</p>
            </header>
            <div className="content-container">
                <h2 className="sub-title">Posts from Followed Users</h2>
                {posts.length === 0 ? (
                    <p className="no-posts">No posts to display.</p>
                ) : (
                    <div className="post-list">
                        {posts.map((post) => (
                            <div key={post.PostID} className="post-card">
                                <div className="user-info">
                                    <div className="profile-placeholder">
                                        {post.PostedBy.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="user-details">
                                        <span className="user-name">{post.PostedBy}</span>
                                        <span className="post-date">{moment(post.PostedDate).fromNow()}</span>
                                    </div>
                                </div>
                                <h3 className="post-title">{post.Title}</h3>
                                <p className="post-content">{post.Content}</p>
                                <div className="post-meta">
                                    <div className="meta-item">
                                        <span className="meta-label">Type:</span> 
                                        <span>{post.PostType}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
