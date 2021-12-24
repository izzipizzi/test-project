import express from 'express';
import { UserModel } from '../models/user.model';
import { IUser, UserLoginData, UserResponseData } from 'shared';

export const signupUser = async (req: express.Request<{}, {}, IUser>, res: express.Response) => {
  const nickname = req.body.nickname;
  const existedUser = await UserModel.findOne({ nickname: nickname });
  if (!existedUser) {
    const user = new UserModel(req.body);
    await user.save();
    res.status(201);
  } else {
    res.status(403).json({
      message: `User already exists with nickname ${nickname}`,
    });
  }
};

export const getUserById = async (req: express.Request<IUser>, res: express.Response) => {
  const user = await UserModel.findById(req.params.id).select(['-password', '-__v']);
  res.status(200).json(user);
};

export const loginUser = async (req: express.Request<{}, {}, UserLoginData>, res: express.Response) => {
  const loginData: UserLoginData = req.body;
  const user = await UserModel.findOne({ nickname: loginData.nickname });
  if (user) {
    user.comparePassword(loginData.password, (err: Error, isMatch: boolean) => {
      if (!isMatch) {
        res.status(403).json({
          message: 'Wrong Password',
        });
      } else {
        const userResponseData: UserResponseData = {
          id: user._id,
          avatar: user.avatar,
          nickname: user.nickname,
        };
        res.status(200).json({
          token: 'Here i will generate token',
          user: userResponseData,
        });
      }
    });
  } else {
    res.status(400).json({
      message: 'Here no User with this credentials.',
    });
  }
};
