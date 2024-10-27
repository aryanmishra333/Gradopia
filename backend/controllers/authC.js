import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
    // Check if the user already exists
    const q = "SELECT * FROM Users WHERE Username = ? OR Email = ?";
    db.query(q, [req.body.username, req.body.email], (err, data) => {
        if (err) return res.json(err);
        if (data.length) return res.status(409).json("User already exists!");

        // Hash password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        // Prepare the insert query with correct syntax
        const insertQuery = `
            INSERT INTO Users 
            (Username, Password, Email, PhoneNumber, DateOfBirth, Role, GraduationYear, CurrentJobTitle, LinkedInProfile) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
        `;

        // Values to insert into the Users table
        const values = [
            req.body.username,
            hash,
            req.body.email,
            req.body.phoneNumber || null, // Optional
            req.body.dateOfBirth || null, // Optional
            req.body.role, // Required: 'Alumni', 'Student', or 'Admin'
            req.body.graduationYear || null, // Optional, applicable only to 'Alumni'
            req.body.currentJobTitle || null, // Optional
            req.body.linkedInProfile || null // Optional
        ];

        // Execute the insert query
        db.query(insertQuery, values, (err, data) => {
            if (err) return res.json(err);
            return res.status(200).json("User has been created.");
        });
    });
};


export const login = (req, res) => {
    const q = "SELECT * FROM Users WHERE Email = ?";
    db.query(q, [req.body.email], (err, data) => {
        // Log the entire data object for debugging
        console.log("Data retrieved from the database:", data);

        if (err) return res.json(err);
        if (data.length === 0) return res.status(404).json("User not found!");

        const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].Password);

        if (!isPasswordCorrect) return res.status(400).json("Wrong email or password!");

        const token = jwt.sign({ id: data[0].UserID }, "jwtkey");
        const { Password, ...other } = data[0];

        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json(other);
    });
};



export const logout = (req, res) => {
    res.clearCookie("access_token", {
        sameSite: "none",
        secure: true
    }).status(200).json("User has been logged out!");
}
