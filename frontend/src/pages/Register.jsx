import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [inputs, setInputs] = useState({
        username: '',
        email: '',
        password: '',
        phoneNumber: '',
        dateOfBirth: '',
        role: '',
        graduationYear: '',
        currentJobTitle: '',
        linkedInProfile: ''
    });

    const [err, setErr] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/auth/register", inputs);  // Updated path
            console.log(res.data);
            navigate("/login");
        } catch (err) {
            setErr(err.response.data);
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <input type="text" name="phoneNumber" placeholder="Phone Number" onChange={handleChange} />
                <input type="date" name="dateOfBirth" onChange={handleChange} />
                <select name="role" value={inputs.role} onChange={handleChange} required>
                    <option value="" disabled>Select Role</option>
                    <option value="Alumni">Alumni</option>
                    <option value="Student">Student</option>
                </select>
                <input type="number" name="graduationYear" placeholder="Graduation Year" onChange={handleChange} />
                <input type="text" name="currentJobTitle" placeholder="Current Job Title" onChange={handleChange} />
                <input type="url" name="linkedInProfile" placeholder="LinkedIn Profile" onChange={handleChange} />
                <button type="submit">Register</button>
            </form>
            {err && <p>{err}</p>}
            <span>Already have an account? <Link to="/login">Login</Link></span>
        </div>
    );
};

export default Register;
