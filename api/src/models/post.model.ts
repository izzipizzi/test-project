import { model, Schema } from 'mongoose';
import { IUser, UserModel } from './user.model';
import { CommentSchema, IComment } from './comment.model';
import { ITag, TagSchema } from './tag.model';
import { ILike } from './like.model';

interface IPost {
  _id: string;
  author: IUser;
  title: string;
  text: string;
  likes: ILike[];
  dateCreated: Date;
  comments: IComment[];
  tags: ITag[];
}

const PostSchema = new Schema<IPost>({
  title: {
    type: String,
    maxlength: 60,
    minlength: 3,
    required: true,
  },
  text: {
    type: String,
    maxlength: 7000,
    minlength: 3,
    required: true,
  },
  likes: {
    type: [CommentSchema],
    default: [],
    required: true,
  },
  dateCreated: {
    type: Date,
    default: new Date(),
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: UserModel,
    required: true,
  },
  comments: {
    type: [CommentSchema],
    default: [],
    required: true,
  },
  tags: {
    type: [TagSchema],
    default: [],
    required: true,
  },
});

export const PostModel = model<IPost>('Post', PostSchema);
