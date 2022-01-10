import { User } from './User';
import { Like } from './Like';
export interface CommentPartialDto {
    text: string;
    likes: Like[];
}
export interface Comment extends CommentPartialDto {
    _id: string;
    author: User;
    dateCreated: Date;
}
export interface CommentCreateDto extends CommentPartialDto {
    authorId: string;
}
export interface PostCommentCreateData {
    postId: string;
    comment: CommentCreateDto;
}
export interface CommentLikeCreateDto {
    commentId: string;
    userId: string;
}
export interface CommentLikeDeleteDto {
    commentId: string;
    likeId: string;
}
