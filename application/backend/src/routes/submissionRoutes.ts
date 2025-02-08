// Purpose: Define the routes for the submission data model.

import express from 'express';
import { SubmissionDataHandler } from '../models/SubmissionDataHandler';

const router = express.Router();
const db = new SubmissionDataHandler();

// CREATE
router.post('/', async (req, res) => {
    try {
        await db.addData(req.body);
        res.status(201).json();
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// READ
router.get('/', async (req, res) => {
    try {
        await db.fetchData();
        res.status(200).json(res);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// UPDATE
router.put('/:id', async (req, res) => {
    try {
        await db.updateData(req.params.id, req.body);
        res.status(200).json();
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// DESTROY
router.delete('/:id', async (req, res) => {
    try {
        await db.deleteData(req.params.id);
        res.status(200).json();
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
