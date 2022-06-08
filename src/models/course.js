import mongoose from "mongoose";

const courseSchema = mongoose.Schema({
   title: String,
   subtitle: String,
   description: String,
   name: String,
   creator: String,
   tags: [String],
   imageFile: String,
   createdAt: {
      type: Date,
      default: new Date(),
   },
   likes: {
      type: [String],
      default: [],
   },
});

const CoursesModal = mongoose.model("Course", courseSchema);

export default CoursesModal;