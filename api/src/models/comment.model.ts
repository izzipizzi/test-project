import { model, Schema } from 'mongoose';
import { UserModel } from './user.model';
import { Comment } from 'shared';
import { LikeSchema } from './like.model';

export const CommentSchema = new Schema<Comment>({
  text: {
    type: String,
    maxlength: 500,
    minlength: 1,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: UserModel,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: new Date(),
  },
  likes: {
    type: [LikeSchema],
    default: [],
  },
});

export const CommentModel = model<Comment>('Comment', CommentSchema);
