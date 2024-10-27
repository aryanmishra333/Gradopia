import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { AuthContext } from '../context/authContext';

const PostDetail = () => {
    const location = useLocation(); // Get current location
    const navigate = useNavigate(); // Get navigate function
    const postID = location.pathname.split('/')[2]; // Extract post ID using pathname split
    const [post, setPost] = useState({}); // Initialize post as an empty object

    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/api/newsposts/${postID}`); // Fetch the post by ID
                setPost(res.data);
            } catch (err) {
                console.log(err); // Log any errors
            } 
        };

        fetchData();
    }, [postID]); // Fetch post when the ID changes

    const handleUpdate = () => {
        console.log(`Update post with ID: ${postID}`);
        // Logic for updating the post would go here
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/newsposts/${postID}`); 
            navigate('/'); // Redirect to home after deletion
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <h2>Posted By: {post.Username}</h2> {/* Display the username at the top */}
            <h1>{post.Title}</h1>
            <p>{post.Content}</p>
            <p><strong>Posted On:</strong> {moment(post.PostedDate).fromNow()}</p>
            
            {/* Update and Delete buttons */}
            {currentUser && currentUser.UserID === post.PostedBy && ( // Updated to match foreign key
                <>
                    <button onClick={handleUpdate} style={{ marginRight: '10px' }} state={post}>Update</button>
                    <button onClick={handleDelete}>Delete</button>
                </>
            )}
        </div>
    );
};

export default PostDetail;
