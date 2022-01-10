import { IUser } from './User';
export interface ILike {
    _id: string;
    author: IUser;
    dateCreated: Date;
}
export interface PostLikeCreateData {
    postId: string;
    userId: string;
}
export interface PostLikeDeleteData {
    postId: string;
    likeId: string;
}
