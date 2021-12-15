import express from 'express';
import postRouter from './routers/post.router';
import dotenv from 'dotenv';
import { internalServerErrorHandler, notFoundErrorHandler } from './middleware/errorHandler';

const app = express();

dotenv.config();

const PORT = process.env.PORT;

app.use('/', express.static('dist/test-project'));

app.use('/api/posts', postRouter);

app.get('*', notFoundErrorHandler);
app.use(internalServerErrorHandler);

app.listen(PORT, () => console.log(`Running on PORT ${PORT}`));
