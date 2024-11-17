import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js"
import {Assignment} from '../models/assignment.model.js';
import { getAssignments } from "../controllers/assignment.controller.js";
import { isAdmin } from "../middlewares/isAdmin.middleware.js";
const router = express.Router();

router.get('/assignments', authMiddleware, getAssignments);

router.post('/assignments/:id/accept', authMiddleware, isAdmin, async (req, res) => {
    await Assignment.findByIdAndUpdate(req.params.id, { status: 'accepted' });
    res.json({
        success: true, 
        message: 'Assignment accepted' 
    });
});

router.post('/assignments/:id/reject', authMiddleware, isAdmin, async (req, res) => {
    await Assignment.findByIdAndUpdate(req.params.id, { status: 'rejected' });
    res.json({ 
        success: true,
        message: 'Assignment rejected' 
    });
});

export default  router;
