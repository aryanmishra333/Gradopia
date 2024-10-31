import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { AuthContext } from '../context/authContext';

const JobDetail = () => {
    const location = useLocation(); // Get current location
    const navigate = useNavigate(); // Get navigate function
    const jobID = location.pathname.split('/')[2]; // Extract job ID using pathname split
    const [job, setJob] = useState({}); // Initialize job as an empty object

    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/api/jobsposts/${jobID}`); // Fetch the job by ID
                setJob(res.data);
            } catch (err) {
                console.log(err); // Log any errors
            } 
        };

        fetchData();
    }, [jobID]); // Fetch job when the ID changes

    const handleUpdate = () => {
        console.log(`Update job with ID: ${jobID}`);
        // Logic for updating the job would go here
        // Navigate to JobPost component with current job data
        navigate('/jobs-post', { state: job });
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/jobsposts/${jobID}`); 
            navigate('/dashboard'); // Redirect to dashboard after deletion
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <h2>Job Title: {job.JobTitle}</h2> {/* Display the job title at the top */}
            <h3>Company: {job.CompanyName}</h3>
            <p>{job.JobDescription}</p>
            <p><strong>Location:</strong> {job.JobLocation}</p>
            <p><strong>Posted On:</strong> {moment(job.PostedDate).fromNow()}</p>
            
            {/* Update and Delete buttons */}
            {currentUser && currentUser.UserID === job.PostedBy && ( // Check if current user is the one who posted the job
                <>
                    <button onClick={handleUpdate} style={{ marginRight: '10px' }}>Update</button>
                    <button onClick={handleDelete}>Delete</button>
                </>
            )}
        </div>
    );
};

export default JobDetail;
