import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User';

const saltRounds = 10;

export const authenticate = async (email, password) => {
  return new Promise((resolve, reject) => {
    User.findOne({
        email: email
      })
      .then((user) => {
        if (!user) {
          reject()
        }
        bcrypt.compare(password, user.password, (err, match) => {
          if (err) {
            reject(err);
          }
          if (!match) {
            reject(err);
          }
          resolve(jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            data: user,
          }, 'secret'));
        })
      });
  })
};

export const register = async (email, password, firstName, lastName) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      let user = new User({
        email: email,
        password: hash,
        firstName,
        lastName
      });
      resolve(user.save());
    });
  })
};