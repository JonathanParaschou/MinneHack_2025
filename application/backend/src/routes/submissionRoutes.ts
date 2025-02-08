import express from 'express';

// CRUD operations for submissions
const router = express.Router();

// CREATE
router.post('/', async (req, res) => {
    try {

    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
    });

// READ
router.get('/', async (_req, res) => {
    try {

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
