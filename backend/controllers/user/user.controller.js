import User from "../../models/user/user.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import Post from "../../models/post/post.js";

export const signUp = async (req, res) => {
    try {

        const { firstName, lastName, email, password } = req.body;

        //check if email exists
        const isEmail = await User.findOne({ email: email });

        if (isEmail) {
            return res.status(200).json({ "message": "Email already exist" })
        }

        //generate salt
        const salt = await bcrypt.genSalt(10);

        //hash password
        const hashedPassword = await bcrypt.hash(password, salt)
        const user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword
        })
        await user.save();

        res.status(201).json({ message: "signUp successful" })
    } catch (error) {
        console.log(error)
    }
}
export const login = async (req, res) => {

    try {
        const { email, password } = req.body;
        const isUser = await User.findOne({ email: email });
        // is email there
        if (!isUser) {
            return res.status(401).json({ message: 'invalid creds' })
        }
        // if password is correct
        const isCorrectUser = await bcrypt.compare(password, isUser.password)
        if (!isCorrectUser) {
            return res.status(401).json({ message: 'invalid password here' });
        }
        //create jwt token
        const token = await jwt.sign({ _id: isUser._id }, 'my_secret', { expiresIn: '3h' })
        return res.status(201).json({
            id: isUser._id,
            email: isUser.email,
            token
        });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
}

export const getallUser = async (req, res) => {
    try {
        const data = await User.find();

        res.status(200).json(data)

    } catch (error) {
        console.log(error)

    }
}











export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);// Assuming req.user contains the authenticated user's ID
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
};



export const UserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);// Assuming req.user contains the authenticated user's ID
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


export const getpost = async (req, res) => {
    try {
        const post = await Post.find({ author: req.user.id })
            .populate('author', 'email firstName lastName')
            .populate({
                path: 'comment',
                populate: {
                    path: 'author',
                    select: 'email firstName lastName timestamps'
                },
                // select: 'content timestamps' 
            })
            .exec();// Assuming req.user contains the authenticated user's ID
        if (!post) {
            return res.status(404).json({ message: 'post not found' });
        }
        res.status(200).json(post);
    } catch (error) {
        console.error('Error fetching posts', error);
        res.status(500).json({ message: 'Server error' });
    }
};