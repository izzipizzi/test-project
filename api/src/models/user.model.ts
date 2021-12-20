import { model, Schema } from 'mongoose';

export interface IUser {
  _id: string;
  name: string;
  surname: string;
  avatar: string;
}

export const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    maxlength: 32,
    minlength: 2,
    required: true,
  },
  surname: {
    type: String,
    maxlength: 32,
    minlength: 2,
    required: true,
  },
  avatar: {
    type: String,
  },
});

export const UserModel = model<IUser>('User', UserSchema);
