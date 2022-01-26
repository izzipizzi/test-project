import { model, Schema } from 'mongoose';
import { UserModel } from './user.model';
import { Like } from 'shared';

export const LikeSchema = new Schema<Like>({
  author: {
    type: Schema.Types.ObjectId,
    ref: UserModel,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: new Date(),
  },
});

export const LikeModel = model<Like>('Like', LikeSchema);
