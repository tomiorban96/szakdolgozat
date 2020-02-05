"use strict";

import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';

import {
  router as UserRouter
} from './routes/router';

const app = express();
const port = process.env.PORT | 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/', UserRouter);

const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
};

mongoose.connect('mongodb://localhost:27017/users', mongoOptions).then(
  () => {
    console.log("Connected to MongoDB")
    app.listen(port, () => console.log(`Listening on port: ${port}`));
  },
  (err) => console.log(err)
);