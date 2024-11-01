import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { AuthContext } from '../context/authContext';

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
                console.log(err);
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
            console.log(err);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/jobsposts/${jobID}`);
            navigate('/dashboard');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            {isEditing ? (
                <div>
                    <input 
                        type="text" 
                        value={companyName} 
                        onChange={(e) => setCompanyName(e.target.value)} 
                    />
                    <input 
                        type="text" 
                        value={jobTitle} 
                        onChange={(e) => setJobTitle(e.target.value)} 
                    />
                    <textarea 
                        value={jobDescription} 
                        onChange={(e) => setJobDescription(e.target.value)} 
                    />
                    <input 
                        type="text" 
                        value={jobLocation} 
                        onChange={(e) => setJobLocation(e.target.value)} 
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
                        <>
                            <button onClick={() => setIsEditing(true)} style={{ marginRight: '10px' }}>Update</button>
                            <button onClick={handleDelete}>Delete</button>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default JobDetail;
