import CoursesModal from "../models/course.js";
import mongoose from "mongoose";

export const createCourse = async (req, res) => {
   const course = req.body;
   const newCourse = new CoursesModal({
      ...course,
      creator: req.userId,
      createdAt: new Date().toISOString(),
   });

   try {
      await newCourse.save();
      res.status(201).json(newCourse);
   } catch (error) {
      res.status(404).json({ message: "Something went wrong" });
   }
};

export const getCourses = async (req, res) => {
   const { page } = req.query;
   try {
      // const Courses = await CoursesModal.find();
      // res.status(200).json(Courses);

      const limit = 6;
      const startIndex = (Number(page) - 1) * limit;
      const total = await CoursesModal.countDocuments({});
      const Courses = await CoursesModal.find().limit(limit).skip(startIndex);
      res.json({
         data: Courses,
         currentPage: Number(page),
         totalCourses: total,
         numberOfPages: Math.ceil(total / limit),
      });
   } catch (error) {
      res.status(404).json({ message: "Something went wrong" });
   }
};

export const getCourse = async (req, res) => {
   const { id } = req.params;
   try {
      const coure = await CoursesModal.findById(id);
      res.status(200).json(coure);
   } catch (error) {
      res.status(404).json({ message: "Something went wrong" });
   }
};

export const getCoursesByUser = async (req, res) => {
   const { id } = req.params;
   if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "User doesn't exist" });
   }
   const userCourses = await CoursesModal.find({ creator: id });
   res.status(200).json(userCourses);
};

export const deleteCourse = async (req, res) => {
   const { id } = req.params;
   try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
         return res.status(404).json({ message: `No Course exist with id: ${id}` });
      }
      await CoursesModal.findByIdAndRemove(id);
      res.json({ message: "Course deleted successfully" });
   } catch (error) {
      res.status(404).json({ message: "Something went wrong" });
   }
};

export const updateCourse = async (req, res) => {
   const { id } = req.params;
   const { title, description, creator, imageFile, tags } = req.body;
   try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
         return res.status(404).json({ message: `No Course exist with id: ${id}` });
      }

      const updatedCourse = {
         creator,
         title,
         description,
         tags,
         imageFile,
         _id: id,
      };
      await CoursesModal.findByIdAndUpdate(id, updatedCourse, { new: true });
      res.json(updatedCourse);
   } catch (error) {
      res.status(404).json({ message: "Something went wrong" });
   }
};

export const getCoursesBySearch = async (req, res) => {
   const { searchQuery } = req.query;
   try {
      const title = new RegExp(searchQuery, "i");
      const Courses = await CoursesModal.find({ title });
      res.json(Courses);
   } catch (error) {
      res.status(404).json({ message: "Something went wrong" });
   }
};

export const getCoursesByTag = async (req, res) => {
   const { tag } = req.params;
   try {
      const Courses = await CoursesModal.find({ tags: { $in: tag } });
      res.json(Courses);
   } catch (error) {
      res.status(404).json({ message: "Something went wrong" });
   }
};

export const getRelatedCourses = async (req, res) => {
   const tags = req.body;
   try {
      const Courses = await CoursesModal.find({ tags: { $in: tags } });
      res.json(Courses);
   } catch (error) {
      res.status(404).json({ message: "Something went wrong" });
   }
};

export const likeCourse = async (req, res) => {
   const { id } = req.params;
   try {
      if (!req.userId) {
         return res.json({ message: "User is not authenticated" });
      }

      if (!mongoose.Types.ObjectId.isValid(id)) {
         return res.status(404).json({ message: `No Course exist with id: ${id}` });
      }

      const Course = await CoursesModal.findById(id);

      const index = Course.likes.findIndex((id) => id === String(req.userId));

      if (index === -1) {
         Course.likes.push(req.userId);
      } else {
         Course.likes = Course.likes.filter((id) => id !== String(req.userId));
      }

      const updatedCourse = await CoursesModal.findByIdAndUpdate(id, Course, {
         new: true,
      });

      res.status(200).json(updatedCourse);
   } catch (error) {
      res.status(404).json({ message: error.message });
   }
};