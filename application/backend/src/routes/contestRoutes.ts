// Purpose: Define the routes for the submission data model.

import express from 'express';
import { ContestDataHandler } from '../models/ContestDataHandler';
import { UserInfo } from 'interfaces/IUserInfo';
import { authenticate } from '../authMiddleware';

// CRUD operations for submissions
const router = express.Router();
const db = new ContestDataHandler();

router.get('/', async (req, res) => {
    try {
        const data = await db.getContest();
        res.status(200).json(data);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});


export default router;
