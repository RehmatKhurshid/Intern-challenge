import express from 'express';
import { createComment, getAllComments } from '../../controllers/comment/comment.controller.js';
import { isAuthenticated } from '../../middlewares/user.middleware.js';

const router = express.Router();

router.post('/createComment', isAuthenticated, createComment);
router.get('/comment',getAllComments)

export default router
