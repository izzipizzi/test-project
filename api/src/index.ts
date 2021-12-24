import express from 'express';
import postRouter from './routers/post.router';
import dotenv from 'dotenv';
import { internalServerErrorHandler, notFoundErrorHandler } from './middleware/errorHandler';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRouter from './routers/user.router';
import commentRouter from './routers/comment.router';

const app = express();

dotenv.config();

const PORT = process.env.PORT;

app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log(`He-he ....\nDB connected`);
});

app.use('/', express.static('dist/test-project'));

app.use('/api/posts', postRouter);
app.use('/api/user', userRouter);
app.use('/api/comment', commentRouter);

app.get('*', notFoundErrorHandler);
app.use(internalServerErrorHandler);

app.listen(PORT, () => console.log(`Running on PORT ${PORT}`));
