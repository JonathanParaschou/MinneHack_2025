// Purpose: Define the routes for the submission data model.

import express from 'express';
import { UserDataHandler } from '../models/UserDataHandler';
import { UserInfo } from 'interfaces/IUserInfo';
import { authenticate } from '../authMiddleware';

// CRUD operations for submissions
const router = express.Router();
const db = new UserDataHandler();

// Fetching all submission data other than user
// router.get('/', async (req, res) => {
//     try {
//         const users = await db.fetchAllNonUserData(req.headers['authorization'] as string);
//         res.status(200).json(users);
//     } catch (err: any) {
//         res.status(500).json({ error: err.message });
//     }
// });

router.get('/nonfriends', authenticate, async (req, res) => {
    try {
        const users = await db.fetchAllNonUserFriendsData(req.headers['authorization'] as string);
        res.status(200).json(users);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// Fetching all submission data
router.get('/user', authenticate, async (req, res) => {
    try {
        const user = await db.fetchUserDataByUID(req.headers['authorization'] as string);
        res.status(200).json(user);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/friends', authenticate, async (req, res) => {
    try {
        const friends = await db.fetchUserFriendsData(req.headers['authorization'] as string);
        res.status(200).json(friends);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// Fetching all user data from a list of ids
router.get('/:ids', authenticate, async (req, res) => {
    try {
        const users = await db.fetchUserDataByCreatorIds(req.params.ids.split(','));
        res.status(200).json(users);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});


// Create a new submission
router.post('/', async (req, res) => {
    try {
        const data = req.body as UserInfo;
        await db.addData(data);
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

// // Delete an existing Submission
// router.delete('/:id', async (req, res) => {
//     try {
//         await db.deleteData(req.params.id);
//         res.status(200).json();
//     } catch (err: any) {
//         res.status(500).json({ error: err.message });
//     }
// });

// // Fetch all submissions based on creator ID
// router.get('/creator/:creatorIds', async (req, res) => {
//     try {
//         const submissions = await db.fetchSubmissionDataByCreatorIds([req.params.creatorIds]);
//         res.status(200).json(submissions);
//     } catch (err: any) {
//         res.status(500).json({ error: err.message });
//     }
// });

// // Fetch submission by ID
// router.get('/:id', async (req, res) => {
//     try {
//         const submission = await db.fetchSubmissionDataById(req.params.id);
//         res.status(200).json(submission);
//     } catch (err: any) {
//         res.status(500).json({ error: err.message });
//     }
// });

export default router;
