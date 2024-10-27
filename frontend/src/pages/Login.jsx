import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext} from '../context/authContext.jsx';

const Login = () => {
    
    const[inputs, setInputs] = useState({  
        email: '',
        password: ''
    });

    const [err, setErr] = useState(null);

    const navigate= useNavigate();

    const{login}=useContext(AuthContext)

    const handleChange = (e) => {
        setInputs(prev => ({...prev, [e.target.name]: e.target.value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res=await login(inputs);
            console.log(res.data);
            navigate("/");
        } catch (err) {
            setErr(err.response.data);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form>
                <input type="email" name="email" placeholder="Email" required onChange={handleChange}/>
                <input type="password" name="password" placeholder="Password" required onChange={handleChange}/>
                <button type="submit" onClick={handleSubmit}>Login</button>
                {err && <p>{err}</p>}
                <span>Don't have an account? <Link to="/register">Register</Link></span>
            </form>
        </div>
    );
};

export default Login;
