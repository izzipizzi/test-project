import { CommentCreateDto, CommentLikeCreateDto, CommentLikeDeleteDto, ServerResponse } from 'shared';
import { CommentModel } from '../models/comment.model';
import express from 'express';
import { createLike, deleteLike } from './like.service';
import { haveAccess } from './shared.service';

export const createComment = async (createCommentData: CommentCreateDto) => {
  return await new CommentModel({
    author: createCommentData.authorId,
    text: createCommentData.text,
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
  const comment = await CommentModel.findById(req.params.commentId);
  if (!comment) {
    res.status(404).json(new ServerResponse('Not Found', 404));
  }
  if (haveAccess(comment.author._id, req.user)) {
    try {
      await comment.deleteOne();
      res.status(200).json(new ServerResponse('Comment successfully deleted.', 200));
    } catch (e) {
      res.status(500).json(new ServerResponse('Internal Server Error', 500));
    }
  } else {
    res.status(403).json(new ServerResponse('Access denied', 403));
  }
};
