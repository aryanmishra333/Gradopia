// src/components/Dashboard.jsx
import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/authContext';
import './Dashboard.css'; // Importing CSS file for styles

const Dashboard = () => {
    const { currentUser } = useContext(AuthContext);
    const [newsPosts, setNewsPosts] = useState([]);
    const [jobPosts, setJobPosts] = useState([]);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchData = async (endpoint, setter, filterKey) => {
            try {
                const res = await axios.get(endpoint);
                const filteredData = Array.isArray(res.data) 
                    ? res.data.filter(item => item[filterKey] === currentUser.UserID) 
                    : [];
                
                setter(filteredData);
            } catch (err) {
                console.log(`Error fetching ${endpoint}:`, err);
            }
        };

        if (currentUser) {
            fetchData("/api/newsposts", setNewsPosts, "PostedBy");
            fetchData("/api/jobsposts", setJobPosts, "PostedBy");
            fetchData("/api/events", setEvents, "OrganizerID");
        }
    }, [currentUser]);

    return (
        <div className="dashboard-container">
            <h1>Dashboard</h1>

            {/* News Posts Section */}
            <section className="card-section">
                <h2>Your News Posts</h2>
                {newsPosts.length === 0 ? (
                    <p>No news posts available for you.</p>
                ) : (
                    <div className="card-list">
                        {newsPosts.map((post) => (
                            <div key={post.NewsID} className="card">
                                <Link to={`/post/${post.NewsID}`} className="card-link">
                                    <h3>{post.Title}</h3>
                                    <p>{post.Content}</p>
                                    <p><strong>Posted By:</strong> {post.PostedBy}</p>
                                    <p><strong>Posted On:</strong> {new Date(post.PostedDate).toLocaleDateString()}</p>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Job Posts Section */}
            <section className="card-section">
                <h2>Your Job Posts</h2>
                {jobPosts.length === 0 ? (
                    <p>No job posts available for you.</p>
                ) : (
                    <div className="card-list">
                        {jobPosts.map((job) => (
                            <div key={job.JobID} className="card">
                                <Link to={`/job/${job.JobID}`} className="card-link">
                                    <h3>{job.JobTitle} at {job.CompanyName}</h3>
                                    <p>{job.JobDescription}</p>
                                    <p><strong>Location:</strong> {job.JobLocation}</p>
                                    <p><strong>Posted On:</strong> {new Date(job.PostedDate).toLocaleDateString()}</p>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Events Section */}
            <section className="card-section">
                <h2>Your Events</h2>
                {events.length === 0 ? (
                    <p>No events available for you.</p>
                ) : (
                    <div className="card-list">
                        {events.map((event) => (
                            <div key={event.EventID} className="card">
                                <Link to={`/events/${event.EventID}`} className="card-link">
                                    <h3>{event.EventName}</h3>
                                    <p><strong>Date:</strong> {new Date(event.EventDate).toLocaleDateString()}</p>
                                    <p><strong>Location:</strong> {event.EventLocation}</p>
                                    <p><strong>Max Participants:</strong> {event.MaxParticipants}</p>
                                    <p><strong>Posted On:</strong> {new Date(event.PostedDate).toLocaleDateString()}</p>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default Dashboard;
