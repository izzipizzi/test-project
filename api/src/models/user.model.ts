import { Document, model, Schema } from 'mongoose';
import { nicknameValidation, passwordValidation, User, UserRole } from 'shared';
import bcrypt from 'bcrypt';

export interface IUserDocument extends User {
  comparePassword: (password: string, next: (err: any | null, isMatch?: boolean) => void) => void;
}

export const UserSchema = new Schema<IUserDocument>({
  nickname: {
    type: String,
    maxlength: nicknameValidation.maxlength,
    minlength: nicknameValidation.minLength,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    maxlength: passwordValidation.maxlength,
    minlength: passwordValidation.minLength,
    required: true,
  },
  avatar: {
    type: String,
  },
  role: {
    type: String,
    enum: Object.keys(UserRole),
    default: UserRole.REGULAR,
  },
});

UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();
  const user = this;
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (password: string, next: (err: any | null, isMatch?: boolean) => void) {
  bcrypt.compare(password, this.password, function (err, isMatch) {
    if (err) return next(err);
    next(null, isMatch);
  });
};

export const UserModel = model<IUserDocument>('User', UserSchema);
