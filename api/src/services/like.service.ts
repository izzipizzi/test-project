import { LikeModel } from '../models/like.model';
import { Like } from 'shared';

export const createLike = async (userId: string): Promise<Like> => {
  return await new LikeModel({ author: userId }).save();
};

export const deleteLike = async (likeId: string): Promise<Like> => {
  return LikeModel.findByIdAndDelete(likeId);
};
