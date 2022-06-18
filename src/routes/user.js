import express from 'express';
const router = express.Router();

import { getUser, googleSignIn, signin, signup } from '../controllers/user.js';

router.get("/", getUser);
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/googleSignIn", googleSignIn);

export default router;