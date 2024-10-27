import axios from 'axios';

export const register = (formData) => {
    return axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, formData);
};

export const login = (formData) => {
    return axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, formData);
};
