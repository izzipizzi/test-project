import { LikeModel } from '../models/like.model';
import { ILike } from 'shared';

export const createLike = async (userId: string): Promise<ILike> => {
  return await new LikeModel({ author: userId }).save();
};

export const deleteLike = async (likeId: string): Promise<ILike> => {
  return LikeModel.findByIdAndDelete(likeId);
};
