import express from 'express';
const router = express.Router();

import { signin, signup, googleSignIn } from '../controllers/user.js'

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/googleSignIn", googleSignIn);
router.get("/", (req, res) => {
    res.send("Helcome to Courses API - ");
})

export default router;