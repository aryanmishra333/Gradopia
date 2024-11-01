// src/components/PostNews.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './PostNews.css'; // Importing CSS for styles

const NewsPost = () => {
    const state = useLocation().state;
    const [title, setTitle] = useState(state?.title || ''); // State for title
    const [content, setContent] = useState(state?.content || ''); // State for content
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(null); // Error state
    const navigate = useNavigate(); // Hook for navigation

    const handleClick = async (e) => {
        e.preventDefault(); // Prevent default form submission
        setLoading(true); // Set loading to true
        setError(null); // Reset error state

        try {
            // Determine whether to create a new post or update an existing one
            const response = state
                ? await axios.put(`/api/newsposts/${state.id}`, { title, content })
                : await axios.post('/api/newsposts', { title, content });

            console.log('Post created:', response.data); // Log success message
            navigate('/'); // Redirect after posting news
        } catch (error) {
            setError('Error posting news. Please try again later.'); // User-friendly error message
            console.error('Error posting news:', error.response?.data || error.message); // Log error message
        } finally {
            setLoading(false); // Set loading to false
        }
    };

    return (
        <div className="news-post-container">
            <h2>Post News</h2>
            <form onSubmit={handleClick} className="news-post-form"> {/* Attach handleClick to form submission */}
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={title} // Bind state value
                    onChange={(e) => setTitle(e.target.value)} // Update state on change
                    required
                />
                <textarea
                    name="content"
                    placeholder="Content"
                    value={content} // Bind state value
                    onChange={(e) => setContent(e.target.value)} // Update state on change
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Posting...' : 'Post News'}
                </button>
                {error && <p className="error-message">{error}</p>} {/* Display error message */}
            </form>
        </div>
    );
};

export default NewsPost;
