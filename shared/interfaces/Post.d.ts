import { IUser } from './User';
import { ILike } from './Like';
import { IComment } from './Comment';
import { ITag } from './Tag';
export interface IPost {
    _id: string;
    author: IUser;
    title: string;
    text: string;
    likes: ILike[];
    dateCreated: Date;
    comments: IComment[];
    tags: ITag[];
}
export interface PostsResponseData {
    totalCount: number;
    page: number;
    posts: IPost[];
}
