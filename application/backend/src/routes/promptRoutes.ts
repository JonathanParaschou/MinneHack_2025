// Purpose: Define the routes for the submission data model.

import express from 'express';
import { PromptDataHandler } from '../models/PromptDataHandler';

// CRUD operations for submissions
const router = express.Router();
const db = new PromptDataHandler();

// Fetching current prompt
router.get('/', async (req, res) => {
    try {
        const prompt = await db.fetchPrompt();
        res.status(200).json(prompt);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/uid', async (req, res) => {
    try {
        const uid = req.body.uid;
        await db.addUID(uid);
        res.status(200).json({ message: "User status updated successfully." });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
