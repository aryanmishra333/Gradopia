// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error fetching posts: {error}</p>;

    return (
        <div>
            <h1>Welcome to Alumnix</h1>
            <p>Connect with your alumni and stay updated with events and job postings.</p>
            <h2>Posts from Followed Users</h2>
            {posts.length === 0 ? (
                <p>No posts to display.</p>
            ) : (
                <ul>
                    {posts.map((post) => (
                        <li key={post.PostID} style={{ marginBottom: '20px' }}>
                            <h3>{post.Title}</h3>
                            <p>{post.Content}</p>
                            <small>Posted by: {post.PostedBy}</small><br />
                            <small>Posted on: {new Date(post.PostedDate).toLocaleString()}</small><br />
                            <small>Type: {post.PostType}</small>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Home;
