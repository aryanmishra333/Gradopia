import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import NewsPost from './pages/NewsPost'; // Import the CreatePost component
import PostDetail from './pages/PostDetail'; // Import the PostDetail component
import JobsPost from './pages/JobsPost';
import JobDetail from './pages/JobDetail';
import EventPost from './pages/EventPost';
import EventDetail from './pages/EventDetail';
import UserPage from './pages/UserPage';

const App = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/news-post" element={<NewsPost />} /> {/* New route for CreatePost */}
                <Route path="/post/:id" element={<PostDetail />} /> {/* New route for PostDetail */}
                <Route path="/jobs-post" element={<JobsPost />} />
                <Route path="/job/:id" element={<JobDetail />} />
                <Route path="/events-post" element={<EventPost />} />
                <Route path="/events/:id" element={<EventDetail />} />
                <Route path="/user/:username" element={<UserPage />} />
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;
