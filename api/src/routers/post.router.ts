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

const postRouter = express.Router();

postRouter.get('/', getAllPosts);
postRouter.get('/:postId', getPostById);
postRouter.get('/user/:userId', getPostsByUser);

postRouter.post('/', createPost);
postRouter.post('/like', setPostLike);
postRouter.post('/tag', createPostTag);
postRouter.post('/comment', createPostComment);

postRouter.delete('/like', removePostLike);
postRouter.delete('/tag', removePostTag);

export default postRouter;
