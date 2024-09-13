import express from 'express';
import { register, login, getUser, logout } from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Auth routes
router.post('/register', register);
router.post('/login', login);
router.get('/logout',logout);
// Protected route to get logged-in user
router.get('/me', authMiddleware, getUser);

export default router;
