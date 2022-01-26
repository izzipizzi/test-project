import postRouter from './post.router';
import userRouter from './user.router';
import commentRouter from './comment.router';
import express from 'express';

const apiRouter = express.Router();

apiRouter.use('/posts', postRouter);
apiRouter.use('/user', userRouter);
apiRouter.use('/comment', commentRouter);

export default apiRouter;
