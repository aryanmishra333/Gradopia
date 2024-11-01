// src/components/Dashboard.jsx
import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/authContext';

const Dashboard = () => {
    const { currentUser } = useContext(AuthContext);
    const [newsPosts, setNewsPosts] = useState([]);
    const [jobPosts, setJobPosts] = useState([]);
    const [events, setEvents] = useState([]); // State for events

    useEffect(() => {
        const fetchNewsPosts = async () => {
            try {
                const res = await axios.get("/api/newsposts");
                const filteredNewsPosts = Array.isArray(res.data) 
                    ? res.data.filter(post => post.PostedBy === currentUser.UserID) 
                    : [];
                
                setNewsPosts(filteredNewsPosts);
            } catch (err) {
                console.log("Error fetching news posts:", err);
            }
        };

        const fetchJobPosts = async () => {
            try {
                const res = await axios.get("/api/jobsposts");
                const filteredJobPosts = Array.isArray(res.data) 
                    ? res.data.filter(post => post.PostedBy === currentUser.UserID) 
                    : [];
                
                setJobPosts(filteredJobPosts);
            } catch (err) {
                console.log("Error fetching job posts:", err);
            }
        };

        const fetchEvents = async () => { // Fetch events created by the current user
            try {
                const res = await axios.get("/api/events");
                const filteredEvents = Array.isArray(res.data) 
                    ? res.data.filter(event => event.OrganizerID === currentUser.UserID) 
                    : [];
                
                setEvents(filteredEvents);
            } catch (err) {
                console.log("Error fetching events:", err);
            }
        };
        
        if (currentUser) {
            fetchNewsPosts();
            fetchJobPosts();
            fetchEvents(); // Call the fetch events function
        }
    }, [currentUser]);

    return (
        <div>
            <h1>Dashboard</h1>

            {/* News Posts Section */}
            <section>
                <h2>Your News Posts</h2>
                {newsPosts.length === 0 ? (
                    <p>No news posts available for you.</p>
                ) : (
                    <ul>
                        {newsPosts.map((post) => (
                            <li key={post.NewsID} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
                                <Link to={`/post/${post.NewsID}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <h3>{post.Title}</h3>
                                    <p>{post.Content}</p>
                                    <p><strong>Posted By:</strong> {post.PostedBy}</p>
                                    <p><strong>Posted On:</strong> {new Date(post.PostedDate).toLocaleDateString()}</p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            {/* Job Posts Section */}
            <section>
                <h2>Your Job Posts</h2>
                {jobPosts.length === 0 ? (
                    <p>No job posts available for you.</p>
                ) : (
                    <ul>
                        {jobPosts.map((job) => (
                            <li key={job.JobID} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
                                <Link to={`/job/${job.JobID}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <h3>{job.JobTitle} at {job.CompanyName}</h3>
                                    <p>{job.JobDescription}</p>
                                    <p><strong>Location:</strong> {job.JobLocation}</p>
                                    <p><strong>Posted On:</strong> {new Date(job.PostedDate).toLocaleDateString()}</p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            {/* Events Section */}
            <section>
                <h2>Your Events</h2>
                {events.length === 0 ? (
                    <p>No events available for you.</p>
                ) : (
                    <ul>
                        {events.map((event) => (
                            <li key={event.EventID} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
                                <Link to={`/events/${event.EventID}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <h3>{event.EventName}</h3>
                                    <p><strong>Date:</strong> {new Date(event.EventDate).toLocaleDateString()}</p>
                                    <p><strong>Location:</strong> {event.EventLocation}</p>
                                    <p><strong>Max Participants:</strong> {event.MaxParticipants}</p>
                                    <p><strong>Posted On:</strong> {new Date(event.PostedDate).toLocaleDateString()}</p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    );
};

export default Dashboard;
