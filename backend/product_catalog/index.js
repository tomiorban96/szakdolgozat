"use strict";

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

import {
  router as ProductRouter
} from './routes/router';

const app = express();
const port = process.env.PORT | 3001;

app.use(cors());
app.use(bodyParser.json());
app.use('/', ProductRouter);

const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
};

mongoose.connect('mongodb://localhost:27017/products', mongoOptions).then(
  () => {
    console.log("Connected to MongoDB")
    app.listen(port, () => console.log(`Listening on port: ${port}`));
  },
  (err) => console.log(err)
);