import express from 'express';
import { getUserById, loginUser, signupUser } from '../services/user.service';

const userRouter = express.Router();

userRouter.get('/:id', getUserById);
userRouter.post('/signup', signupUser);
userRouter.post('/login', loginUser);

export default userRouter;
