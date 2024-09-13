import express from 'express';
import { updateScore, getLeaderboard } from '../controllers/scoreController.js';
import AuthMidllewARE from '../middleware/authMiddleware.js';


const router = express.Router();

// Protected routes for score management
router.post('/score',AuthMidllewARE, updateScore);
router.get('/leaderboard',AuthMidllewARE, getLeaderboard);

export default router;
