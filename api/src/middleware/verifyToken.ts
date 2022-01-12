import express from 'express';
import jwt from 'jsonwebtoken';
import { ServerResponse, UserResponseDto } from 'shared';

export const verifyToken = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const token: string = req.headers['x-access-token'] as string;
    if (!token) {
      return res.status(403).json(new ServerResponse('Token is required', 403));
    }
    try {
      const decoded: UserResponseDto = jwt.verify(token, process.env.SECRET) as UserResponseDto;
      req.user = decoded;
    } catch (e) {
      return res.status(401).json(new ServerResponse('Invalid token', 401));
    }
    return next();
  } catch (e) {
    next(e);
  }
};
