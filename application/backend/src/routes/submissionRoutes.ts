import express from 'express';
import { SubmissionDataHandler } from '../models/SubmissionDataHandler';

// CRUD operations for submissions
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

    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
});

// DESTROY
router.delete('/:id', async (req, res) => {
    try {

    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
