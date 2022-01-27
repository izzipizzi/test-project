import express from 'express';
import {
  createPost,
  createPostComment,
  createPostTag,
  getAllPosts,
  getPostById,
  getPostsByUser,
  removePostLike,
  removePostTag,
  setPostLike,
} from '../services/post.service';
import { verifyToken } from '../middleware/verifyToken';

const postRouter = express.Router();

postRouter.get('/', getAllPosts);
postRouter.get('/:postId', getPostById);
postRouter.get('/user/:userId', getPostsByUser);

postRouter.post('/', verifyToken, createPost);
postRouter.post('/like', verifyToken, setPostLike);
postRouter.post('/tag', verifyToken, createPostTag);
postRouter.post('/comment', verifyToken, createPostComment);

postRouter.delete('/like', verifyToken, removePostLike);
postRouter.delete('/tag', verifyToken, removePostTag);

export default postRouter;
