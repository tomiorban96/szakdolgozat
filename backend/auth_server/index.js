import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';

import {
  router as UserRouter
} from './routes/router';

const app = express();
const port = process.env.PORT || 3000;
const mongo_host = process.env.MONGO_HOST || 'localhost'

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/api/auth/', UserRouter);

const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
};

mongoose.connect(`mongodb://${mongo_host}:27017/users`, mongoOptions).then(
  () => {
    console.log("Connected to MongoDB")
    app.listen(port, () => console.log(`Listening on port: ${port}`));
  },
  (err) => console.log(err)
);