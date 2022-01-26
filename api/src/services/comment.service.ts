import { CommentCreateDto, CommentLikeCreateDto, CommentLikeDeleteDto } from 'shared';
import { CommentModel } from '../models/comment.model';
import express from 'express';
import { createLike, deleteLike } from './like.service';

export const createComment = async (createCommentData: CommentCreateDto) => {
  return await new CommentModel({
    author: createCommentData.authorId,
    text: createCommentData.text,
    likes: createCommentData.likes,
  }).save();
};

export const addCommentLike = async (req: express.Request<{}, {}, CommentLikeCreateDto>, res: express.Response) => {
  const comment = await CommentModel.findById(req.body.commentId);
  const like = await createLike(req.body.userId);
  await comment.likes.push(like);
  await comment.save();
  res.status(201).json({
    message: 'Liked',
  });
};

export const removeCommentLike = async (req: express.Request<{}, {}, CommentLikeDeleteDto>, res: express.Response) => {
  const like = await deleteLike(req.body.likeId);
  await CommentModel.findByIdAndUpdate(req.body.commentId, {
    $pull: { likes: { _id: like._id } },
  });
  res.status(200).json({
    message: 'Unliked',
  });
};

export const removeComment = async (req: express.Request<{ commentId: string }>, res: express.Response) => {
  await CommentModel.findByIdAndDelete(req.params.commentId);
  res.status(200).json({
    message: 'Comment successfully deleted.',
  });
};
