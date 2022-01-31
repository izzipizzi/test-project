import express from 'express';
import dotenv from 'dotenv';
import { internalServerErrorHandler, notFoundErrorHandler } from './middleware/errorHandler';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import apiRouter from './routers/api.router';
import { errors } from 'celebrate';
import path from 'path';
import proxy from 'express-http-proxy';

const app = express();

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const PORT = process.env.PORT;
const HOST = process.env.NODE_ENV == 'production' ? process.env.HOST : `http://localhost:${PORT}`;

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log(`He-he ....\nDB connected`);
});

app.use(bodyParser.json());
app.use('/api', apiRouter);

app.use(express.static(path.join(__dirname, 'public')));
app.use('/*', proxy(HOST + '/*'));

app.all('/api/*', notFoundErrorHandler);

app.use(errors());
app.use(internalServerErrorHandler);

app.listen(PORT, () => {
  console.log(`Running on HOST ${HOST}`);
  console.log(`Running on PORT ${PORT}`);
});
