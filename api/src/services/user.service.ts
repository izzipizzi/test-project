import express from 'express';
import { UserModel } from '../models/user.model';
import { ServerResponse, User, UserLoginDto, UserResponseDto } from 'shared';
import jwt from 'jsonwebtoken';

export const signUpUser = async (req: express.Request<{}, {}, User>, res: express.Response) => {
  const nickname = req.body.nickname;
  const existedUser = await UserModel.findOne({ nickname: nickname });
  if (!existedUser) {
    const user = new UserModel(req.body);
    await user.save();
    res.status(201).json(new ServerResponse('Success', 201));
  } else {
    res.status(409).json(new ServerResponse(`User already exists with nickname ${nickname}`, 409));
  }
};

export const getUserById = async (req: express.Request, res: express.Response) => {
  const user = await UserModel.findById(req.params.id).select(['-password', '-__v']);
  res.status(200).json(user);
};

export const signInUser = async (req: express.Request<{}, {}, UserLoginDto>, res: express.Response) => {
  const loginData: UserLoginDto = req.body;
  const user = await UserModel.findOne({ nickname: loginData.nickname });
  if (user) {
    user.comparePassword(loginData.password, (err: Error, isMatch: boolean) => {
      if (!isMatch) {
        res.status(403).json({
          message: 'Wrong Password',
        });
      } else {
        const userResponseData: UserResponseDto = {
          _id: user._id,
          avatar: user.avatar,
          nickname: user.nickname,
          role: user.role,
          token: jwt.sign({ _id: user._id, nickname: user.nickname, role: user.role }, process.env.SECRET, {
            expiresIn: '7days',
          }),
        };
        res.status(200).json(userResponseData);
      }
    });
  } else {
    res.status(400).json(new ServerResponse('Here no User with this credentials.', 400));
  }
};
