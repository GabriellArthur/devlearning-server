import express from 'express';
const router = express.Router();
import auth from '../middleware/auth.js';

import {
   createCourse,
   deleteCourse,
   getRelatedCourses,
   getCourse,
   getCourses,
   getCoursesBySearch,
   getCoursesByTag,
   getCoursesByUser,
   likeCourse,
   updateCourse,
} from "../controllers/courses.js";
//Not Authentication
router.get("/search", getCoursesBySearch);
router.get("/tag/:tag", getCoursesByTag);
router.post("/relatedCourses", getRelatedCourses);
router.get("/", getCourses);
router.get("/:id", getCourse);

//Authentication
router.post("/", auth, createCourse);
router.delete("/:id", auth, deleteCourse);
router.patch("/:id", auth, updateCourse);
router.get("/userCourses/:id", auth, getCoursesByUser);
router.patch("/like/:id", auth, likeCourse);

export default router;