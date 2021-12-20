import { model, Schema } from 'mongoose';
import { IUser, UserModel } from './user.model';

export interface IComment {
  _id: string;
  author: IUser;
  text: string;
  dateCreated: Date;
}

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
});

export const CommentModel = model<IComment>('Comment', CommentSchema);
