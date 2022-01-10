import { IUser } from './User';
import { ILike } from './Like';
export interface CommentPartialData {
    text: string;
    likes: ILike[];
}
export interface IComment extends CommentPartialData {
    _id: string;
    author: IUser;
    dateCreated: Date;
}
export interface CommentCreateData extends CommentPartialData {
    authorId: string;
}
export interface PostCommentCreateData {
    postId: string;
    comment: CommentCreateData;
}
export interface CommentLikeCreateData {
    commentId: string;
    userId: string;
}
export interface CommentLikeDeleteData {
    commentId: string;
    likeId: string;
}
