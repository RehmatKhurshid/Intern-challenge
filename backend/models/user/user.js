import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
    },
    lastName : {
        type : String,
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type :String,
        required : true
    },
    score: { 
        type: Number, 
        default: 0 
    },
    // posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    // comment: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]

}, {timestamps : true});

const User = mongoose.model('User', userSchema);

export default User