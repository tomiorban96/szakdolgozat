import {
  Schema as MongooseSchema,
  model
} from 'mongoose';
const Schema = MongooseSchema;

let UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  }
});

export default model('User', UserSchema);