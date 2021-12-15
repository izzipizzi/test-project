import express from 'express';
import { getAllPosts } from '../services/post.service';

const postRouter = express.Router();

postRouter.get('/', getAllPosts);
postRouter.get('/error', (req, res, next) => {
  next(new Error('Some test error'));
});

export default postRouter;
