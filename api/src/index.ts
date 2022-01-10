import express from 'express';
import dotenv from 'dotenv';
import { internalServerErrorHandler, notFoundErrorHandler } from './middleware/errorHandler';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import apiRouter from './routers/api.router';

const app = express();

dotenv.config();

const PORT = process.env.PORT;

app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log(`He-he ....\nDB connected`);
});

app.use('/', express.static('../dist/test-project'));

app.use('/api', apiRouter);

app.all('*', notFoundErrorHandler);

app.use(internalServerErrorHandler);

app.listen(PORT, () => console.log(`Running on PORT ${PORT}`));
