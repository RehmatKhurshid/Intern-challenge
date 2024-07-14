import express from 'express';
import { connectDB } from './utils/db/mongo.js';
import userRoutes from './routes/user/user.route.js'
import postRoutes from './routes/post/post.route.js'
import commentRoutes from './routes/comment/comment.route.js'

const app= express();

app.use(express.json());
app.use(express.urlencoded());

//routes middleware
app.use('/api', userRoutes);
app.use('/api', postRoutes);
app.use('/api', commentRoutes);


const PORT = process.env.PORT || 5001

app.listen(PORT,  async() => {
    await connectDB();
    console.log(`server is running on port ${PORT}`)
})
