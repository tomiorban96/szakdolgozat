import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';

import {
  router as CartRouter
} from './routes/router';

const app = express();
const port = process.env.PORT || 3002;
const mongo_host = process.env.MONGO_HOST || 'localhost'

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/api/cart/', CartRouter); 

const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
};

mongoose.connect(`mongodb://${mongo_host}:27017/cart`, mongoOptions).then(
  () => {
    console.log("Connected to MongoDB")
    app.listen(port, () => console.log(`Listening on port: ${port}`));
  },
  (err) => console.log(err)
);