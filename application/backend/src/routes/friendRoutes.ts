// Purpose: Define the routes for the submission data model.

import express from 'express';
import { FriendDataHandler } from '../models/FriendDataHandler';
import { UserInfo } from 'interfaces/IUserInfo';
import { authenticate } from '../authMiddleware';

// CRUD operations for submissions
const router = express.Router();
const db = new FriendDataHandler();

// Send request from user to other
router.post('/sendRequest', async (req, res) => {
    try {
        const other = req.body.other;
        const user = req.body.user;

        await db.sendRequest(user, other);
        res.status(200).send();
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// accept request on both ends user and other
router.post('/acceptRequest', async (req, res) => {
    try {
        const other = req.body.other;
        const user = req.body.user;

        await db.acceptRequest(user, other);
        res.status(200).send();
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// remove other from user's friendRequests
router.post('/rejectRequest', async (req, res) => {
    try {
        const other = req.body.other;
        const user = req.body.user;

        await db.rejectRequest(user, other);
        res.status(200).send();
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// remove friend from user and user from friend
router.post('/removeFriend', async (req, res) => {
    try {
        const other = req.body.other;
        const user = req.body.user;

        await db.removeFriend(user, other);
        res.status(200).send();
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
