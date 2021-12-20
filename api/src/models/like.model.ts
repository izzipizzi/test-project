import { model, Schema } from 'mongoose';
import { IUser, UserModel } from './user.model';

export interface ILike {
  _id: string;
  user: IUser;
}

export const LikeSchema = new Schema<ILike>({
  user: {
    type: Schema.Types.ObjectId,
    ref: UserModel,
    required: true,
  },
});

export const LikeModel = model<ILike>('Like', LikeSchema);
