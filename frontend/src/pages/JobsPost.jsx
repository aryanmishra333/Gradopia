// src/components/JobPost.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const JobPost = () => {
    const state = useLocation().state;
    const [companyName, setCompanyName] = useState(state?.companyName || '');
    const [jobTitle, setJobTitle] = useState(state?.jobTitle || '');
    const [jobDescription, setJobDescription] = useState(state?.jobDescription || '');
    const [jobLocation, setJobLocation] = useState(state?.jobLocation || '');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = state
                ? await axios.put(`/api/jobsposts/${state.id}`, { companyName, jobTitle, jobDescription, jobLocation })
                : await axios.post('/api/jobsposts/', { companyName, jobTitle, jobDescription, jobLocation });

            console.log('Job posted:', response.data);
            navigate('/dashboard');
        } catch (error) {
            console.error('Error posting job:', error.response.data);
        }
    };

    return (
        <div>
            <h2>Post a Job</h2>
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Post Job</button>
            </form>
        </div>
    );
};

export default JobPost;
