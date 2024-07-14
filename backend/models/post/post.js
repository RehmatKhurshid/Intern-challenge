import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
    },
    comment: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
}, 
{ timestamps: true });

const Post = mongoose.model('Post', postSchema);

export default Post
