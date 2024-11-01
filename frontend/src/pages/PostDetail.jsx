import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { AuthContext } from '../context/authContext';

const PostDetail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const postID = location.pathname.split('/')[2];
    const [post, setPost] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/api/newsposts/${postID}`);
                setPost(res.data);
                setTitle(res.data.Title);
                setContent(res.data.Content);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [postID]);

    const handleUpdate = async () => {
        try {
            await axios.put(`/api/newsposts/${postID}`, { title, content });
            setIsEditing(false); // Close edit mode after updating
            navigate(`/dashboard`);
        } catch (err) {
            console.log(err);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/newsposts/${postID}`);
            navigate('/dashboard');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            {isEditing ? (
                <div>
                    <input 
                        type="text" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                    />
                    <textarea 
                        value={content} 
                        onChange={(e) => setContent(e.target.value)} 
                    />
                    <button onClick={handleUpdate}>Save</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
            ) : (
                <>
                    <h2>Posted By: {post.Username}</h2>
                    <h1>{post.Title}</h1>
                    <p>{post.Content}</p>
                    <p><strong>Posted On:</strong> {moment(post.PostedDate).fromNow()}</p>

                    {currentUser && currentUser.UserID === post.PostedBy && (
                        <>
                            <button onClick={() => setIsEditing(true)} style={{ marginRight: '10px' }}>Update</button>
                            <button onClick={handleDelete}>Delete</button>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default PostDetail;
