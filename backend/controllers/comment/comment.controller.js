import Comment from "../../models/comment/comment.js";
import User from "../../models/user/user.js";
import Post from "../../models/post/post.js";

export const createComment = async (req, res) => {
    try {
        const { postId, content } = req.body;
        const comment = new Comment({
            post: postId,
            author: req.user.id,
            content
        });
        
        await comment.save();

        const user = await User.findById(req.user.id);

        user.score += 5; 

        await user.save();

        // Populate author details in comment
        const populatedComment = await Comment.findById(comment._id)
            .populate({
                path: 'author',
                model: 'User',
                select: 'firstName lastName' // Select fields you want to populate
            })
            .exec();

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        post.comment.push(populatedComment._id);
        await post.save();
        res.status(201).send(populatedComment);

    } catch (error) {

    }
}

export const getAllComments = async (req, res) => {
    try {
        const data = await Comment.find().populate('author', 'email firstName').exec();
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
    }

}


