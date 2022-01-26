import express from 'express';
import { PostModel } from '../models/post.model';
import {
  defaultPostQuery,
  Post,
  PostCommentCreateData,
  PostLikeCreateDto,
  PostsResponseDto,
  PostTagCreateDto,
  PostTagDeleteDto,
  Query,
} from 'shared';
import { createLike, deleteLike } from './like.service';
import { PostLikeDeleteDto } from '../../../shared';
import { createTag, deleteTag } from './tag.service';
import { FilterQuery } from 'mongoose';
import { createComment } from './comment.service';

const applyTagsFilter = (search: string): FilterQuery<Post> => ({
  tags: { $elemMatch: { text: { $regex: search } } },
});

const getPostsCount = async (): Promise<number> => await PostModel.count();

export const getAllPosts = async (req: express.Request<{}, Query>, res: express.Response) => {
  const search = req?.query?.search || '';
  const order = req?.query?.order ? req.query.order : defaultPostQuery.order;
  const sortBy = req?.query?.sortBy ? req.query.sortBy : defaultPostQuery.sortBy;
  const limit: number = req?.query?.limit
    ? parseInt(req.query.limit as string)
    : parseInt(defaultPostQuery.limit as string);
  const page: number = parseInt(req?.query?.page as string);

  const skip = page * (limit - 1);
  const totalCount = await getPostsCount();

  const posts = await PostModel.find(search ? applyTagsFilter(<string>search) : {})
    .populate([
      {
        path: 'author',
        select: ['-password', '-__v'],
      },
      {
        path: 'likes',
        select: ['-__v'],
        populate: { path: 'author', select: ['-password', '-__v'] },
      },
      {
        path: 'tags',
        select: ['-__v'],
      },
    ])
    .skip(skip)
    .sort([[sortBy, order]])
    .limit(limit);

  const postsResponse: PostsResponseDto = {
    totalCount: totalCount,
    page: page,
    posts: posts,
  };

  res.status(200).json(postsResponse);
};

export const getPostById = async (req: express.Request<{ postId: string }>, res: express.Response) => {
  const post = await PostModel.findById(req.params.postId).populate([
    {
      path: 'author',
      select: ['-password', '-__v'],
    },
    {
      path: 'likes',
      select: ['-__v'],
      populate: { path: 'author', select: ['-password', '-__v'] },
    },
    {
      path: 'tags',
      select: ['-__v'],
    },
    { path: 'comments', select: ['-__v'], populate: { path: 'author', select: ['-password', '-__v'] } },
  ]);
  res.status(200).json(post);
};

export const getPostsByUser = async (req: express.Request<{ userId: string }>, res: express.Response) => {
  const posts = await PostModel.find({ author: req.params.userId });
  res.status(200).json(posts);
};

export const createPost = async (req: express.Request<{}, {}, Post>, res: express.Response) => {
  const post = new PostModel(req.body);
  await post.save();
  res.status(201).json({
    message: 'Post created',
  });
};

export const deletePost = async (req: express.Request<{ postId: string }>, res: express.Response) => {
  await PostModel.findByIdAndDelete(req.params.postId);
  res.status(200).json({
    message: 'Post successfully deleted.',
  });
};

export const setPostLike = async (req: express.Request<{}, {}, PostLikeCreateDto>, res: express.Response) => {
  const post = await PostModel.findById(req.body.postId);
  const like = await createLike(req.body.userId);
  await post.likes.push(like);
  await post.save();
  res.status(201).json({
    message: 'Liked',
  });
};

export const removePostLike = async (req: express.Request<{}, {}, PostLikeDeleteDto>, res: express.Response) => {
  const like = await deleteLike(req.body.likeId);
  await PostModel.findByIdAndUpdate(req.body.postId, {
    $pull: { likes: { _id: like._id } },
  });
  res.status(200).json({
    message: 'Unliked',
  });
};

export const createPostTag = async (req: express.Request<{}, {}, PostTagCreateDto>, res: express.Response) => {
  const post = await PostModel.findById(req.body.postId);
  const tag = await createTag(req.body.text);
  await post.tags.push(tag);
  await post.save();
  res.status(201).json({
    message: 'Tag added',
  });
};

export const removePostTag = async (req: express.Request<{}, {}, PostTagDeleteDto>, res: express.Response) => {
  const tag = await deleteTag(req.body.tagId);
  await PostModel.findByIdAndUpdate(req.body.postId, {
    $pull: { tags: { _id: tag._id } },
  });
  res.status(200).json({
    message: 'Tag removed',
  });
};

export const createPostComment = async (req: express.Request<{}, {}, PostCommentCreateData>, res: express.Response) => {
  const post = await PostModel.findById(req.body.postId);
  const comment = await createComment(req.body.comment);
  await post.comments.push(comment);
  await post.save();
  res.status(201).json({
    message: 'Comment added',
  });
};
