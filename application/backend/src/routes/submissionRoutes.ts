// Purpose: Define the routes for the submission data model.

import express from 'express';
import { SubmissionDataHandler } from '../models/SubmissionDataHandler';
import { UserDataHandler } from '../models/UserDataHandler';

const router = express.Router();
const db = new SubmissionDataHandler();
let auth = new UserDataHandler();

// Fetching all submission data
// router.post('/', async (req, res) => {
//     try {
//         await db.addData(req.body);
//         res.status(201).json();
//     } catch (err: any) {
//         res.status(500).json({ error: err.message });
//     }
// });

// READ
router.get('/', auth.authenticate ,async (req, res) => {
    try {
        await db.fetchData();
        res.status(200).json(res);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// Update data on a specific submission
router.put('/:id', async (req, res) => {
    try {
        await db.updateData(req.params.id, req.body);
        res.status(200).json();
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a submission based on id
router.delete('/:id', async (req, res) => {
    try {
        await db.deleteData(req.params.id);
        res.status(200).json();
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// Fetch all submissions based on creator ID
router.get('/creator/:creatorIds', async (req, res) => {
    try {
        const submissions = await db.fetchSubmissionDataByCreatorIds([req.params.creatorIds]);
        res.status(200).json(JSON.stringify(submissions));
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// Fetch submission by ID
router.get('/:id', async (req, res) => {
    try {
        const submission = await db.fetchSubmissionDataById(req.params.id);
        res.status(200).json(JSON.stringify(submission));
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});


export default router;
