import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import axios from 'axios';
import { AuthContext } from '../context/authContext';

const Dashboard = () => {
    const { currentUser } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("/api/newsposts");
                const filteredPosts = Array.isArray(res.data) 
                    ? res.data.filter(post => post.PostedBy === currentUser.UserID) 
                    : [];
                
                setPosts(filteredPosts);
            } catch (err) {
                console.log(err);
            }
        };

        if (currentUser) {
            fetchData();
        }
    }, [currentUser]);

    return (
        <div>
            <h1>Dashboard</h1>
            {posts.length === 0 ? (
                <p>No news posts available for you.</p>
            ) : (
                <ul>
                    {posts.map((post) => (
                        <li key={post.NewsID} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
                            <Link to={`/post/${post.NewsID}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <h3>{post.Title}</h3>
                                <p>{post.Content}</p>
                                <p><strong>Posted By:</strong> {post.PostedBy}</p>
                                <p><strong>Posted On:</strong> {new Date(post.PostedDate).toLocaleDateString()}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Dashboard;
