import jwt from 'jsonwebtoken';
import User from '../models/User';

export const authenticate = async (email, password) => {

  User.findOne({
    email: email,
    password: password
  })
  .then( (user) => {
    return jwt.sign({
      exp: Math.floor(Date.now() / 1000) + (60 * 60),
      data: user,
    }, 'secret');
  })
};

export const register = async (email, password) => {
  let user = new User({
    email: email,
    password: password
  });
  return user.save();
};