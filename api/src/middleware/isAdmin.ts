import express from 'express';
import { ServerResponse, UserRole } from 'shared';

export const isAdmin = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (req.user.role !== UserRole.ADMIN) {
    res.status(403).json(new ServerResponse('Access denied', 403));
  }
  next();
};
