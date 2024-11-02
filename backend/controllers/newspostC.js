import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getPosts = (req, res) => {
    const q = "SELECT * FROM NewsPosts";
    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
};
// Function to get a post by its ID
export const getPost = (req, res) => {
    const q = `SELECT * FROM GetPostById(?)`;  // Calling the function created in the database
    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data[0]); // Returns the first row from the function result
    });
};

export const addPost = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        console.log("userInfo after decoding JWT:", userInfo); // Check userInfo content here
        if (err) return res.status(403).json("Token is not valid!");

        const q = "INSERT INTO NewsPosts (Title, Content, PostedBy) VALUES (?, ?, ?)";
        console.log(req.body.title, req.body.content, userInfo.id); // Updated to userInfo.id
        db.query(q, [req.body.title, req.body.content, userInfo.id], (err, data) => {   
            if (err) return res.status(500).json(err);
            return res.status(200).json("Post has been added!");
        });
    });
};

export const deletePost = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");
        console.log("userInfo after decoding JWT:", userInfo); // Check userInfo content here
    
        const postId = req.params.id; // Get the post ID from the request parameters
        const q = "DELETE FROM NewsPosts WHERE NewsID = ? AND PostedBy = ?"; // Only allow deletion if the user is the one who posted it

        db.query(q, [postId, userInfo.id], (err, data) => {
            if (err) {
                console.error("Error deleting post:", err); // Log the error for debugging
                return res.status(500).json("Error deleting the post!");
            }

            if (data.affectedRows === 0) {
                return res.status(403).json("You can delete only your post!"); // If no rows were affected, the user is not authorized to delete this post
            }

            return res.status(200).json("Post has been deleted!");
        });
    });    
};


export const updatePost = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const postId = req.params.id; // Post ID to update
        const { title, content } = req.body; // New title and content from request

        const q = "UPDATE NewsPosts SET Title = ?, Content = ? WHERE NewsID = ? AND PostedBy = ?";
        
        db.query(q, [title, content, postId, userInfo.id], (err, data) => {
            if (err) {
                console.error("Error updating post:", err); // Log error
                return res.status(500).json("Error updating the post!");
            }

            if (data.affectedRows === 0) {
                return res.status(403).json("You can update only your post!"); // No permission
            }

            return res.status(200).json("Post has been updated!");
        });
    });
};