import express from 'express';
import postRouter from './routers/post.router';
import dotenv from 'dotenv';
import { internalServerErrorHandler, notFoundErrorHandler } from './middleware/errorHandler';
import mongoose from 'mongoose';

const app = express();

dotenv.config();

const PORT = process.env.PORT;

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log(`He-he ....\nDB connected`);
});

app.use('/', express.static('dist/test-project'));

app.use('/api/posts', postRouter);

app.get('*', notFoundErrorHandler);
app.use(internalServerErrorHandler);

app.listen(PORT, () => console.log(`Running on PORT ${PORT}`));
