import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './JobPost.css'; // Importing CSS for styles

const JobPost = () => {
    const state = useLocation().state;
    const [companyName, setCompanyName] = useState(state?.companyName || '');
    const [jobTitle, setJobTitle] = useState(state?.jobTitle || '');
    const [jobDescription, setJobDescription] = useState(state?.jobDescription || '');
    const [jobLocation, setJobLocation] = useState(state?.jobLocation || '');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null); // Reset error state

        try {
            const response = state
                ? await axios.put(`/api/jobsposts/${state.id}`, { companyName, jobTitle, jobDescription, jobLocation })
                : await axios.post('/api/jobsposts/', { companyName, jobTitle, jobDescription, jobLocation });

            console.log('Job posted:', response.data);
            navigate('/dashboard');
        } catch (error) {
            setError('Error posting job. Please try again later.'); // User-friendly error message
            console.error('Error posting job:', error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="job-post-container">
            <h2>Post a Job</h2>
            <form onSubmit={handleSubmit} className="job-post-form">
                <input
                    type="text"
                    placeholder="Company Name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Job Title"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Job Description"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Job Location"
                    value={jobLocation}
                    onChange={(e) => setJobLocation(e.target.value)}
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Posting...' : 'Post Job'}
                </button>
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
};

export default JobPost;
