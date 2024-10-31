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

    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/api/events/${eventID}`); 
                setEvent(res.data);
            } catch (err) {
                console.log(err); 
            } 
        };

        fetchData();
    }, [eventID]); 

    const handleUpdate = () => {
        console.log(`Update event with ID: ${eventID}`);
        navigate('/events-post', { state: event });
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
            <h2>Event Name: {event.EventName}</h2> 
            <h3>Location: {event.EventLocation}</h3>
            <h4>Date: {moment(event.EventDate).format("MMMM Do YYYY")}</h4>
            <h4>Max Participants: {event.MaxParticipants}</h4>
            <p>{event.EventDescription}</p>
            {currentUser && (
                <div>
                    <button onClick={handleUpdate}>Update Event</button> 
                    <button onClick={handleDelete}>Delete Event</button> 
                </div>
            )}
        </div>
    );
};

export default EventDetail;
