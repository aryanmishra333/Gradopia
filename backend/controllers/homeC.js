// src/controllers/homeC.js
import { db } from '../db.js';
import jwt from "jsonwebtoken";

export const getHome = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");
        const userId = userInfo.id;
        // Union query to get posts from followed users across NewsPosts, Events, and JobPostings
        const q = `
            SELECT p.NewsID AS PostID, p.Title, p.Content, p.PostedDate, u.Username AS PostedBy, 'NewsPost' AS PostType
            FROM FriendConnections fc
            JOIN NewsPosts p ON p.PostedBy = fc.UserID2
            JOIN Users u ON u.UserID = p.PostedBy
            WHERE fc.UserID1 = ?
            
            UNION ALL
            
            SELECT e.EventID AS PostID, e.EventName AS Title, e.EventDescription AS Content, e.PostedDate, u.Username AS PostedBy, 'Event' AS PostType
            FROM FriendConnections fc
            JOIN Events e ON e.OrganizerID = fc.UserID2
            JOIN Users u ON u.UserID = e.OrganizerID
            WHERE fc.UserID1 = ?
            
            UNION ALL
            
            SELECT j.JobID AS PostID, j.JobTitle AS Title, j.JobDescription AS Content, j.PostedDate, u.Username AS PostedBy, 'JobPosting' AS PostType
            FROM FriendConnections fc
            JOIN JobPostings j ON j.PostedBy = fc.UserID2
            JOIN Users u ON u.UserID = j.PostedBy
            WHERE fc.UserID1 = ?
            
            ORDER BY PostedDate DESC;
        `;

        // Execute the query with userId passed three times for each subquery
        db.query(q, [userId, userId, userId], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        });
    });
};
