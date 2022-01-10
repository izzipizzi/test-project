import { model, Schema } from 'mongoose';
import { UserModel } from './user.model';
import { CommentSchema } from './comment.model';
import { TagSchema } from './tag.model';
import { IPost } from 'shared';
import { LikeSchema } from './like.model';

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
    type: [LikeSchema],
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
