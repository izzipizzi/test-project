import { model, Schema } from 'mongoose';
import { User } from 'shared';
import bcrypt from 'bcrypt';

interface IUserDocument extends User, Document {
  comparePassword: (password: string, next: (err: any | null, isMatch?: boolean) => void) => void;
}

export const UserSchema = new Schema<IUserDocument>({
  nickname: {
    type: String,
    maxlength: 32,
    minlength: 2,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    maxlength: 32,
    minlength: 6,
    required: true,
  },
  avatar: {
    type: String,
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

UserSchema.methods.comparePassword = function (password, next) {
  bcrypt.compare(password, this.password, function (err, isMatch) {
    if (err) return next(err);
    next(null, isMatch);
  });
};

export const UserModel = model<IUserDocument>('User', UserSchema);
