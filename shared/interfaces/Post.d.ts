import { UserResponseData } from './User';
import { ILike } from './Like';
import { IComment } from './Comment';
import { ITag } from './Tag';
export interface IPost extends PostPartialData {
    _id: string;
    likes: ILike[];
    dateCreated: Date;
    comments: IComment[];
    tags: ITag[];
    author?: UserResponseData;
}
export interface PostsResponseData {
    totalCount: number;
    page: number;
    posts: IPost[];
}
export interface CreatePostData extends PostPartialData {
    author?: string;
}
export interface PostPartialData {
    title: string;
    text: string;
}
