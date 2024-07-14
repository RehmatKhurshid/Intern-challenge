import express from "express"
import { getallUser, getpost, getUserProfile, login, signUp, UserProfile } from "../../controllers/user/user.controller.js";
import { isAuthenticated } from "../../middlewares/user.middleware.js";

const router = express.Router();

router.post('/signup', signUp)
router.post('/login', login)
router.get('/user',getallUser)
// router.get('/user/:id',isAuthenticated, getOneUser);
router.get('/user/posts', isAuthenticated, getpost);
router.get('/user/:id', isAuthenticated, getUserProfile);
router.get('/profile', isAuthenticated, UserProfile);





export default router;