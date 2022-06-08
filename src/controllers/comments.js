import CommentsModal from "../models/comment.js";
import mongoose from "mongoose"

export const createComment = async (req, res) => {
    const comment = req.body;
    const newComment = new CommentsModal({
        ...comment,
        author: req.userId,
        createAt: new Date().toISOString(),
    });

    try {
        await newComment.save();
        res.status(201).json(newComment);
    } catch (error) {
        res.status(404).json({ message: "Something went wrong" });
    }
}

export const deleteComment = async (req, res) => {
    const { id } = req.params;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: `No comment exist with id: ${id}`});
        }
        await CommentsModal.findByIdAndRemove(id);
        res.json({ message: "Message deleted succesfully" });
    } catch (error) {
        res.status(404).json({ message: "Something went wrong" })
    }
}

export const getComment = async (req, res) => {
    const { id } = req.params;
    try {
        const comment = await CommentsModal.findById(id);
        res.status(200).json(comment)
    } catch (error) {
        res.status(404).json({ message: "Something went wrong" })
    }

}

export const getComments = async (req, res) => {
    try {
        const Comments = await CommentsModal.find();
        res.json({
            data: Comments
        })
    } catch (error) {
        res.status(404).json({ message: "Something went wrong" });
    }

}

export const getCommentsByUser = async (req, res) => {
    const { id } = req.params; // id do usuario que criou o comentario
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: "User doesn't exist "});
    }
    try {
        const userComments = await CommentsModal.find( { author: id});
        res.status(200).json(userComments);
    } catch (error) {
        res.status(404).json({ message: "Something went wrong" })
    }
}

export const getCommentsByCourse = async (req, res) => {
    const { id } = req.params; // id do curso
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: "Course doesn't exist "});
    }
    try {
        const courseComments = await CommentsModal.find( {course: id});
        res.status(200).json(courseComments);
    } catch (error) {
        res.status(404).json({ message: "Something went wrong" })
    }
}

export const likeComment = async (req, res) => {
    const { id } = req.params;
    try {
       if (!req.userId) {
          return res.json({ message: "User is not authenticated" });
       }
 
       if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(404).json({ message: `No comment exist with id: ${id}` });
       }
 
       const Comment = await CommentsModal.findById(id);
 
       const index = Comment.likes.findIndex((id) => id === String(req.userId));
 
       if (index === -1) {
          Comment.likes.push(req.userId);
       } else {
          Comment.likes = Comment.likes.filter((id) => id !== String(req.userId));
       }
 
       const updatedComment = await CommentsModal.findByIdAndUpdate(id, Comment, {
          new: true,
       });
 
       res.status(200).json(updatedComment);
    } catch (error) {
       res.status(404).json({ message: error.message });
    }
}

export const updateComment = async (req, res) => {
    const { id } = req.params;
    const { title, description, author, course } = req.body;
    try {
       if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(404).json({ message: `No comment exist with id: ${id}` });
       }
 
       const updateComment = {
          author,
          title,
          description,
          course,
          _id: id,
       };
       await CommentsModal.findByIdAndUpdate(id, updateComment, { new: true });
       res.json(updateComment);
    } catch (error) {
       res.status(404).json({ message: "Something went wrong" });
    }
}