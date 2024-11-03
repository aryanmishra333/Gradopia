// controllers/profileC.js
import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getProfile = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = "SELECT Bio, Address FROM profiles WHERE UserID = ?";
        
        db.query(q, [userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data[0] || {});
        });
    });
};

export const updateProfile = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const { bio, address } = req.body;
        
        // First, check if a profile exists
        const checkQ = "SELECT * FROM profiles WHERE UserID = ?";
        db.query(checkQ, [userInfo.id], (err, result) => {
            if (err) return res.status(500).json(err);

            if (result.length > 0) {
                // Update existing profile
                const updateQ = "UPDATE profiles SET Bio = ?, Address = ? WHERE UserID = ?";
                db.query(updateQ, [bio, address, userInfo.id], (err, data) => {
                    if (err) return res.status(500).json(err);
                    return res.status(200).json("Profile updated successfully!");
                });
            } else {
                // Insert new profile
                const insertQ = "INSERT INTO profiles (UserID, Bio, Address) VALUES (?, ?, ?)";
                db.query(insertQ, [userInfo.id, bio, address], (err, data) => {
                    if (err) return res.status(500).json(err);
                    return res.status(200).json("Profile created successfully!");
                });
            }
        });
    });
};