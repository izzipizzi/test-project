import { model, Schema } from 'mongoose';
import { UserModel } from './user.model';
import { ILike } from 'shared';

export const LikeSchema = new Schema<ILike>({
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

export const LikeModel = model<ILike>('Like', LikeSchema);
