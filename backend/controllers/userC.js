import { db } from "../db.js";
import jwt from "jsonwebtoken";

// Get user by username
export const getUserByUsername = (req, res) => {
    const token = req.cookies.access_token;  // Get the access token from the cookies. Using the access token, we can verify if the user is authenticated.
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const username = req.params.username;

        // Query to get the user data
        const userQuery = "SELECT * FROM Users WHERE Username = ?";
        
        // Query to check if the logged-in user follows the target user
        const followQuery = `
            SELECT COUNT(*) AS isFollowing 
            FROM FriendConnections 
            WHERE UserID1 = ? AND UserID2 = (SELECT UserID FROM Users WHERE Username = ?)
        `;

        db.query(userQuery, [username], (err, userData) => {
            if (err) return res.status(500).json(err);
            if (!userData[0]) return res.status(404).json("User not found!");

            // Check follow status
            db.query(followQuery, [userInfo.id, username], (err, followData) => {
                if (err) return res.status(500).json(err);

                const isFollowing = followData[0].isFollowing > 0;
                return res.status(200).json({ ...userData[0], isFollowing });
            });
        });
    });
};

// Follow a user
export const followUser = (req, res) => {
    const token = req.cookies.access_token; // Get the access token from the cookies. Using the access token, we can verify if the user is authenticated.
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = "INSERT INTO FriendConnections (UserID1, UserID2) VALUES (?, ?)";
        db.query(q, [userInfo.id, req.body.userId], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("User followed!");
        });
    });
};

// Unfollow a user
export const unfollowUser = (req, res) => {
    const token = req.cookies.access_token;  // Get the access token from the cookies. Using the access token, we can verify if the user is authenticated.
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = "DELETE FROM FriendConnections WHERE UserID1 = ? AND UserID2 = ?";
        db.query(q, [userInfo.id, req.body.userId], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("User unfollowed!");
        });
    });
};
