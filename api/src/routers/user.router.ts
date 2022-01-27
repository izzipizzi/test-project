import express from 'express';
import { getUserById, signInUser, signUpUser } from '../services/user.service';
import { authValidator } from '../validators/auth.validator';
import { verifyToken } from '../middleware/verifyToken';

const userRouter = express.Router();

userRouter.get('/:id', verifyToken, getUserById);
userRouter.post('/signup', authValidator, signUpUser);
userRouter.post('/signin', authValidator, signInUser);

export default userRouter;
