import jwt from 'jsonwebtoken';
import User from '../models/user/user.js';
import dotenv from 'dotenv';

dotenv.config();
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
export const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1];

        if (!token) {
           return res.status(401).json({ message: "unauthorization" })
        }
        const decode = await jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findById({ _id: decode._id });
        req.user = await User.findById(decode.id); 
        const { firstName, lastName, email } = user;
        req.user = {
            firstName,
            lastName,
            email,
            id : user._id
        };
        next()
    }

    catch (error) {
       return res.status(401).json({ message: "Not Authenticated" })
        console.log(error)
    }
}
