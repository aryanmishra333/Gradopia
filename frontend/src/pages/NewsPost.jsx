// src/components/PostNews.jsx
import React, { useState } from 'react';
import axios from 'axios'; // Import axios to make API calls
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const NewsPost = () => {
    const state = useLocation().state;
    const [title, setTitle] = useState(state?.title || ''); // State for title
    const [content, setContent] = useState(state?.content || ''); // State for content
    const navigate = useNavigate(); // Hook for navigation

    const handleClick = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
        // Determine whether to create a new post or update an existing one
        const response = state 
            ? await axios.put(`/api/newsposts/${state.id}`, { title, content }) 
            : await axios.post('/api/newsposts', { title, content });

        console.log('Post created:', response.data); // Log success message
        navigate('/'); // Redirect after posting news
    } catch (error) {
        console.error('Error posting news:', error.response.data); // Log error message
        // Optionally display an error message to the user
    }
};


    return (
        <div>
            <h2>Post News</h2>
            <form onSubmit={handleClick}> {/* Attach handleClick to form submission */}
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
                <button type="submit">Post News</button>
            </form>
        </div>
    );
};

export default NewsPost;
