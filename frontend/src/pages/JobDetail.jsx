// src/components/JobDetail.jsx
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { AuthContext } from '../context/authContext';
import './JobDetail.css'; // Import CSS for styles

const JobDetail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const jobID = location.pathname.split('/')[2];
    const [job, setJob] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [companyName, setCompanyName] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [jobLocation, setJobLocation] = useState('');
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/api/jobsposts/${jobID}`);
                setJob(res.data);
                setCompanyName(res.data.CompanyName);
                setJobTitle(res.data.JobTitle);
                setJobDescription(res.data.JobDescription);
                setJobLocation(res.data.JobLocation);
            } catch (err) {
                setError('Failed to load job details. Please try again later.');
                console.log(err);
            } finally {
                setLoading(false); // Set loading to false after fetch
            }
        };
        fetchData();
    }, [jobID]);

    const handleUpdate = async () => {
        try {
            await axios.put(`/api/jobsposts/${jobID}`, {
                companyName,
                jobTitle,
                jobDescription,
                jobLocation,
            });
            setIsEditing(false);
            navigate(`/dashboard`);
        } catch (err) {
            setError('Failed to update job details. Please try again later.');
            console.log(err);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/jobsposts/${jobID}`);
            navigate('/dashboard');
        } catch (err) {
            setError('Failed to delete job. Please try again later.');
            console.log(err);
        }
    };

    if (loading) return <div>Loading...</div>; // Loading state

    return (
        <div className="job-detail-container">
            {error && <p className="error-message">{error}</p>} {/* Display error message */}

            {isEditing ? (
                <div className="edit-form">
                    <input 
                        type="text" 
                        value={companyName} 
                        onChange={(e) => setCompanyName(e.target.value)} 
                        placeholder="Company Name"
                        required
                    />
                    <input 
                        type="text" 
                        value={jobTitle} 
                        onChange={(e) => setJobTitle(e.target.value)} 
                        placeholder="Job Title"
                        required
                    />
                    <textarea 
                        value={jobDescription} 
                        onChange={(e) => setJobDescription(e.target.value)} 
                        placeholder="Job Description"
                        required
                    />
                    <input 
                        type="text" 
                        value={jobLocation} 
                        onChange={(e) => setJobLocation(e.target.value)} 
                        placeholder="Job Location"
                        required
                    />
                    <button onClick={handleUpdate}>Save</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
            ) : (
                <>
                    <h2>Job Title: {job.JobTitle}</h2>
                    <h3>Company: {job.CompanyName}</h3>
                    <p>{job.JobDescription}</p>
                    <p><strong>Location:</strong> {job.JobLocation}</p>
                    <p><strong>Posted On:</strong> {moment(job.PostedDate).fromNow()}</p>

                    {currentUser && currentUser.UserID === job.PostedBy && (
                        <div className="action-buttons">
                            <button onClick={() => setIsEditing(true)} style={{ marginRight: '10px' }}>Update</button>
                            <button onClick={handleDelete}>Delete</button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default JobDetail;
