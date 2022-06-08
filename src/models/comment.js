import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    author: {
        // relacionando/referenciando com user
        // type: Schema.Types.ObjectId,
        // ref: "user",
        // require: true,
    },
    course: {
        // relacionando/referenciando com course
        // type: Schema.Types.ObjectId,
        // ref: "course",
        // require: true,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    likes: {
        type: [String],
        default: [],
    },
});

const CommentsModal = mongoose.model("Comment", commentSchema);
export default CommentsModal;