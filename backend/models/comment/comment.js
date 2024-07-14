import mongoose from "mongoose";

const comentSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    content: { 
        type: String, 
        required: true 
    },

}, { timestamps: true });

const Comment = mongoose.model('Comment', comentSchema);

export default Comment