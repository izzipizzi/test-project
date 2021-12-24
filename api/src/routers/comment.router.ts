import express from 'express';
import { addCommentLike, removeComment, removeCommentLike } from '../services/comment.service';

const commentRouter = express.Router();

commentRouter.post('/like', addCommentLike);

commentRouter.delete('/like', removeCommentLike);
commentRouter.delete('/:commentId', removeComment);

export default commentRouter;
