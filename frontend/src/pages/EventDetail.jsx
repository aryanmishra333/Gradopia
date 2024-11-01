// src/components/EventDetail.jsx
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { AuthContext } from '../context/authContext';
import './EventDetail.css'; // Import CSS for styles

const EventDetail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const eventID = location.pathname.split('/')[2];
    const [event, setEvent] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [eventName, setEventName] = useState('');
    const [eventLocation, setEventLocation] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [maxParticipants, setMaxParticipants] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/api/events/${eventID}`);
                setEvent(res.data);
                setEventName(res.data.EventName);
                setEventLocation(res.data.EventLocation);
                setEventDate(moment(res.data.EventDate).format("YYYY-MM-DD"));
                setMaxParticipants(res.data.MaxParticipants);
                setEventDescription(res.data.EventDescription);
            } catch (err) {
                setError('Failed to load event details. Please try again later.');
                console.log(err);
            } finally {
                setLoading(false); // Set loading to false after fetch
            }
        };

        fetchData();
    }, [eventID]);

    const handleUpdate = async () => {
        try {
            await axios.put(`/api/events/${eventID}`, {
                EventName: eventName,
                EventLocation: eventLocation,
                EventDate: eventDate,
                MaxParticipants: maxParticipants,
                EventDescription: eventDescription
            });
            setIsEditing(false); // Close edit mode after updating
            navigate(`/dashboard`);
        } catch (err) {
            setError('Failed to update event details. Please try again later.');
            console.log(err);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/events/${eventID}`);
            navigate('/dashboard');
        } catch (err) {
            setError('Failed to delete event. Please try again later.');
            console.log(err);
        }
    };

    if (loading) return <div>Loading...</div>; // Loading state

    return (
        <div className="event-detail-container">
            {error && <p className="error-message">{error}</p>} {/* Display error message */}

            {isEditing ? (
                <div className="edit-form">
                    <input 
                        type="text" 
                        value={eventName} 
                        onChange={(e) => setEventName(e.target.value)} 
                        placeholder="Event Name"
                        required
                    />
                    <input 
                        type="text" 
                        value={eventLocation} 
                        onChange={(e) => setEventLocation(e.target.value)} 
                        placeholder="Location"
                        required
                    />
                    <input 
                        type="date" 
                        value={eventDate} 
                        onChange={(e) => setEventDate(e.target.value)} 
                        required
                    />
                    <input 
                        type="number" 
                        value={maxParticipants} 
                        onChange={(e) => setMaxParticipants(e.target.value)} 
                        placeholder="Max Participants"
                        required
                    />
                    <textarea 
                        value={eventDescription} 
                        onChange={(e) => setEventDescription(e.target.value)} 
                        placeholder="Description"
                        required
                    />
                    <button onClick={handleUpdate}>Save</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
            ) : (
                <>
                    <h2>Event Name: {event.EventName}</h2>
                    <h3>Location: {event.EventLocation}</h3>
                    <h4>Date: {moment(event.EventDate).format("MMMM Do YYYY")}</h4>
                    <h4>Max Participants: {event.MaxParticipants}</h4>
                    <p>{event.EventDescription}</p>
                    <p><strong>Posted On:</strong> {moment(event.PostedDate).fromNow()}</p>

                    {currentUser && currentUser.UserID === event.OrganizerID && (
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

export default EventDetail;
