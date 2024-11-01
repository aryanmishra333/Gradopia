// src/routes/home.js
import express from 'express';
import { getHome } from '../controllers/homeC.js';

const router = express.Router();

// Endpoint to get posts from followed users
router.get('/', getHome);

export default router;
