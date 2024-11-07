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
    const q = `SELECT * FROM NewsPosts WHERE NewsID = ?`;  
    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data[0]); 
    });
};

export const addPost = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        console.log("userInfo after decoding JWT:", userInfo);
        if (err) return res.status(403).json("Token is not valid!");

        const q = "INSERT INTO NewsPosts (Title, Content, PostedBy) VALUES (?, ?, ?)";
        console.log(req.body.title, req.body.content, userInfo.id);
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
        console.log("userInfo after decoding JWT:", userInfo); 
    
        const postId = req.params.id; 
        const q = "DELETE FROM NewsPosts WHERE NewsID = ? AND PostedBy = ?";

        db.query(q, [postId, userInfo.id], (err, data) => {
            if (err) {
                console.error("Error deleting post:", err); 
                return res.status(500).json("Error deleting the post!");
            }

            if (data.affectedRows === 0) {
                return res.status(403).json("You can delete only your post!");
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

        const postId = req.params.id; 
        const { title, content } = req.body;

        const q = "UPDATE NewsPosts SET Title = ?, Content = ? WHERE NewsID = ? AND PostedBy = ?";
        
        db.query(q, [title, content, postId, userInfo.id], (err, data) => {
            if (err) {
                console.error("Error updating post:", err);
                return res.status(500).json("Error updating the post!");
            }

            if (data.affectedRows === 0) {
                return res.status(403).json("You can update only your post!"); // No permission
            }

            return res.status(200).json("Post has been updated!");
        });
    });
};