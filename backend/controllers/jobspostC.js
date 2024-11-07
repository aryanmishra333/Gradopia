// src/controllers/jobpostC.js
import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getJobs = (req, res) => {
    const q = "SELECT * FROM JobPostings";
    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
};

export const getJob = (req, res) => {
    const q = "SELECT * FROM JobPostings WHERE JobID = ?";
    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data[0]);
    });
};

export const addJob = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = "INSERT INTO JobPostings (CompanyName, JobTitle, JobDescription, JobLocation, PostedBy) VALUES (?, ?, ?, ?, ?)";
        db.query(q, [req.body.companyName, req.body.jobTitle, req.body.jobDescription, req.body.jobLocation, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Job has been posted!");
        });
    });
};

export const deleteJob = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = "DELETE FROM JobPostings WHERE JobID = ? AND PostedBy = ?";
        db.query(q, [req.params.id, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            if (data.affectedRows === 0) return res.status(403).json("You can delete only your job post!");
            return res.status(200).json("Job has been deleted!");
        });
    });
};

export const updateJob = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const jobId = req.params.id; 
        const { companyName, jobTitle, jobDescription, jobLocation } = req.body; // Updated job details

        const q = "UPDATE JobPostings SET CompanyName = ?, JobTitle = ?, JobDescription = ?, JobLocation = ? WHERE JobID = ? AND PostedBy = ?";
        
        db.query(q, [companyName, jobTitle, jobDescription, jobLocation, jobId, userInfo.id], (err, data) => {
            if (err) {
                console.error("Error updating job post:", err); 
                return res.status(500).json("Error updating the job post!");
            }

            if (data.affectedRows === 0) {
                return res.status(403).json("You can update only your job post!");
            }

            return res.status(200).json("Job has been updated!");
        });
    });
};
