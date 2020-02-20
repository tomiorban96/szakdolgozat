import {
    Schema as MongooseSchema,
    model
  } from 'mongoose';
  const Schema = MongooseSchema;

  let ProductSchema = new Schema({
    name: {
      type: String,
      unique: true,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      required: true
    },
  });
  
  export default model('Product', ProductSchema);