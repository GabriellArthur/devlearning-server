import mongoose from "mongoose";

const courseSchema = mongoose.Schema({
   title: String,
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

const CoursesModal = mongoose.model("Curse", courseSchema);

export default CoursesModal;