import { IUser } from './User';
import { ILike } from './Like';
export interface IComment {
    _id: string;
    author: IUser;
    text: string;
    dateCreated: Date;
    likes: ILike[];
}
