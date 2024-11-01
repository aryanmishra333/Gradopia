// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
                <p className="main-title">Connect with your alumni and stay updated with latest news, events and job postings.</p>
            </header>
            <div className="content-container">
                <h2 className="sub-title">Posts from Followed Users</h2>
                {posts.length === 0 ? (
                    <p className="no-posts">No posts to display.</p>
                ) : (
                    <div className="post-list">
                        {posts.map((post) => (
                            <div key={post.PostID} className="post-card">
                                <h3 className="post-title">{post.Title}</h3>
                                <p className="post-content">{post.Content}</p>
                                <div className="post-meta">
                                    <small>Posted by: {post.PostedBy}</small>
                                    <small>Posted on: {new Date(post.PostedDate).toLocaleString()}</small>
                                    <small>Type: {post.PostType}</small>
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
