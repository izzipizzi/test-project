import { model, Schema } from 'mongoose';
import { UserModel } from './user.model';
import { IComment } from 'shared';
import { LikeSchema } from './like.model';

export const CommentSchema = new Schema<IComment>({
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
    required: true,
  },
  likes: {
    type: [LikeSchema],
    default: [],
    required: true,
  },
});

export const CommentModel = model<IComment>('Comment', CommentSchema);
