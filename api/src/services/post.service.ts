import express from 'express';
import { dummyPosts } from '../dummy-posts';

export const getAllPosts = (req: express.Request, res: express.Response) => {
  res.status(200).json(dummyPosts);
};
