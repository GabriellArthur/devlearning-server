import express from 'express';
const router = express.Router();
import auth from '../middleware/auth.js';

import {
    createComment,
    deleteComment,
    getComment,
    getComments,
    getCommentsByUser,
    getCommentsByCourse,
    likeComment,
    updateComment,
} from "../controllers/comments.js";
//Not Authentication
router.get("/course/:id", getCommentsByCourse);
router.get("/:id", getComment);
router.get("/", getComments);

//Authentication
router.get("/user/:id", auth, getCommentsByUser);
router.patch("/like/:id", auth, likeComment);
router.patch("/:id", auth, updateComment);
router.delete("/:id", auth, deleteComment);
router.post("/", auth, createComment);

export default router;