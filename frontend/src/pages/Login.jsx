// src/components/Login.jsx
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext.jsx';
import './Login.css'; // Importing CSS file for styles

const Login = () => {
    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });

    const [err, setErr] = useState(null);
    const [loading, setLoading] = useState(false); // Loading state
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleChange = (e) => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading
        try {
            const res = await login(inputs);
            console.log(res.data);
            navigate("/");
        } catch (err) {
            setErr(err.response?.data || 'Login failed. Please try again.');
            console.log(err);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    onChange={handleChange}
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
                {err && <p className="error-message">{err}</p>}
                <span>Don't have an account? <Link to="/register">Register</Link></span>
            </form>
        </div>
    );
};

export default Login;
