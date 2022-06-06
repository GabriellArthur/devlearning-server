import express from 'express';
const router = express.Router();

import { signin, signup, googleSignIn, getUser, updateUser, deleteUser, getUsers } from '../controllers/user.js'

router.get("/", getUser);
router.get("/all", getUsers);
router.patch("/", updateUser);
router.delete("/", deleteUser);

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/googleSignIn", googleSignIn);

export default router;