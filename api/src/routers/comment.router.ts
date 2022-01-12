import express from 'express';
import { addCommentLike, removeComment, removeCommentLike } from '../services/comment.service';
import { verifyToken } from '../middleware/verifyToken';

const commentRouter = express.Router();

commentRouter.post('/like', verifyToken, addCommentLike);

commentRouter.delete('/like', verifyToken, removeCommentLike);
commentRouter.delete('/:commentId', verifyToken, removeComment);

export default commentRouter;
