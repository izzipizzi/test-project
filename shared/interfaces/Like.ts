import { User } from './User';

export interface Like {
  _id: string;
  author: User;
  dateCreated: Date;
}

export interface PostLikeCreateDto {
  postId: string;
  userId: string;
}

export interface PostLikeDeleteDto {
  postId: string;
  likeId: string;
}
