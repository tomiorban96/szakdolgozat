import {
  Schema as MongooseSchema,
  model
} from 'mongoose';
const Schema = MongooseSchema;

let CartSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  itemIds: {
    type: Array,
    required: true
  },
});

export default model('Cart', CartSchema);