import Comment from "../../models/comment/comment.js";
import Post from "../../models/post/post.js";
import User from "../../models/user/user.js";

export const createPost = async (req, res) => {
    try {
        const { content } = req.body;
        const post = new Post({
            content,
            author: req.user.id
        })

        await post.save();

        // Update user score
        const user = await User.findById(req.user.id);

        user.score += 10; // Example score for creating a post
        await user.save();
        res.status(201).send(post);
    } catch (error) {
        console.log(error)
    }
}



export const getAllPost = async (req, res) => {
    try {
        const data = await Post.find()
        .populate('author', 'email firstName lastName')
        .populate({
            path: 'comment', 
            populate: {
                path: 'author',
                select: 'email firstName lastName timestamps' 
            },
            // select: 'content timestamps' 
        })
        .exec();

        res.status(200).json(data)
    } catch (error) {
        console.log(error)
    }
}



export const getOnePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        .populate('author', 'email firstName lastName')
        .populate({
            path: 'comment', 
            populate: {
                path: 'author',
                select: 'email firstName lastName' 
            },
            select: 'content' 
        })
        .exec();

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.status(200).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

