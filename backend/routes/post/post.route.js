import express from 'express';
import { createPost, getAllPost, getOnePost } from '../../controllers/post/post.controller.js';
import { isAuthenticated } from '../../middlewares/user.middleware.js';

const router = express.Router();

router.get('/post', getAllPost);
router.post('/post', isAuthenticated, createPost);
router.get('/post/:id',getOnePost)


export default router
