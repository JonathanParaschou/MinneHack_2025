// Purpose: Define the routes for the submission data model.

import express from 'express';
import { SubmissionDataHandler } from '../models/SubmissionDataHandler';
import { authenticate } from '../authMiddleware';

// CRUD operations for submissions
const router = express.Router();
const db = new SubmissionDataHandler();

// Fetching all submission data
router.get('/', authenticate, async (req, res) => {
    try {
        const submissions = await db.fetchData(req.headers["authorization"] as string);
        res.status(200).json(submissions);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// Create a new submission
router.post('/', authenticate, async (req, res) => {
    try {
        await db.addData(req.body);
        res.status(201).json();
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// Update an existing submission
router.put('/:id', authenticate, async (req, res) => {
    try {
        await db.updateData(req.params.id, req.body);
        res.status(200).json();
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// Delete an existing Submission
router.delete('/:id', authenticate, async (req, res) => {
    try {
        await db.deleteData(req.params.id);
        res.status(200).json();
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// Fetch all submissions based on creator ID
router.get('/creator/:creatorIds', authenticate, async (req, res) => {
    try {
        const submissions = await db.fetchSubmissionDataByCreatorIds([req.params.creatorIds]);
        res.status(200).json(submissions);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// Fetch submission by ID
router.get('/:id', authenticate, async (req, res) => {
    try {
        const submission = await db.fetchSubmissionDataById(req.params.id);
        res.status(200).json(submission);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
