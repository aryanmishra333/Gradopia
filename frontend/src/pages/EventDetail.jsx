// src/components/EventDetail.jsx
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { AuthContext } from '../context/authContext';

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
                console.log(err);
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
            console.log(err);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/events/${eventID}`);
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
                        value={eventName} 
                        onChange={(e) => setEventName(e.target.value)} 
                        placeholder="Event Name"
                    />
                    <input 
                        type="text" 
                        value={eventLocation} 
                        onChange={(e) => setEventLocation(e.target.value)} 
                        placeholder="Location"
                    />
                    <input 
                        type="date" 
                        value={eventDate} 
                        onChange={(e) => setEventDate(e.target.value)} 
                    />
                    <input 
                        type="number" 
                        value={maxParticipants} 
                        onChange={(e) => setMaxParticipants(e.target.value)} 
                        placeholder="Max Participants"
                    />
                    <textarea 
                        value={eventDescription} 
                        onChange={(e) => setEventDescription(e.target.value)} 
                        placeholder="Description"
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

export default EventDetail;
