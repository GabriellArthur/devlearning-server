import express from 'express';
const router = express.Router();

import { signin, signup, googleSignIn } from '../controllers/user.js'

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/googleSignIn", googleSignIn);

export default router;