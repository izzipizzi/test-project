import { model, Schema } from 'mongoose';
import { UserModel } from './user.model';
import { CommentSchema } from './comment.model';
import { TagSchema } from './tag.model';
import { Post } from 'shared';
import { LikeSchema } from './like.model';

const PostSchema = new Schema<Post>({
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
  },
  dateCreated: {
    type: Date,
    default: new Date(),
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: UserModel,
    required: true,
  },
  comments: {
    type: [CommentSchema],
    default: [],
  },
  tags: {
    type: [TagSchema],
    default: [],
  },
});

export const PostModel = model<Post>('Post', PostSchema);
