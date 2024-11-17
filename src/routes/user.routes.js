import express from "express"
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { assignmentUpload } from "../controllers/assignment.controller.js";
const router = express.Router();

router.post('/upload', authMiddleware, assignmentUpload);

export default router;
