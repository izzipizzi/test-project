import express from 'express';

export const notFoundErrorHandler = (req: express.Request, res: express.Response) => {
  res.status(404).send({ message: 'Not Found' });
};

export const internalServerErrorHandler = (
  err: express.ErrorRequestHandler,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  res.status(500).send({ message: 'Internal server error' });
};
