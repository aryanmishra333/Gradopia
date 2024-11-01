// src/controllers/eventC.js
import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getEvents = (req, res) => {
    const q = "SELECT * FROM Events";
    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
};

export const getEvent = (req, res) => {
    const q = "SELECT * FROM Events WHERE EventID = ?";
    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data[0]);
    });
};

export const addEvent = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = "INSERT INTO Events (EventName, EventDate, EventLocation, OrganizerID, MaxParticipants, EventDescription) VALUES (?, ?, ?, ?, ?, ?)";
        db.query(q, [req.body.eventName, req.body.eventDate, req.body.eventLocation, userInfo.id, req.body.maxParticipants, req.body.eventDescription], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Event has been created!");
        });
    });
};

export const deleteEvent = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = "DELETE FROM Events WHERE EventID = ? AND OrganizerID = ?";
        db.query(q, [req.params.id, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            if (data.affectedRows === 0) return res.status(403).json("You can delete only your event!");
            return res.status(200).json("Event has been deleted!");
        });
    });
};

export const updateEvent = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = "UPDATE Events SET EventName = ?, EventDate = ?, EventLocation = ?, MaxParticipants = ?, EventDescription = ? WHERE EventID = ? AND OrganizerID = ?";
        const values = [
            req.body.EventName,
            req.body.EventDate,
            req.body.EventLocation,
            req.body.MaxParticipants,
            req.body.EventDescription
        ];

        db.query(q, [...values, req.params.id, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            if (data.affectedRows === 0) return res.status(403).json("You can update only your event!");
            return res.status(200).json("Event has been updated!");
        });
    });
};
