import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import md5 from 'md5';
import User from '../models/User';

const saltRounds = 10;
const secret = 'secret';

export const authenticate = async (email, password) => {
  return new Promise((resolve, reject) => {
    User.findOne({
        email: email
      })
      .then((user) => {
        if (!user) {
          reject()
        } else {
          bcrypt.compare(password, user.password, (err, match) => {
            if (err || !match) {
              reject(err);
            } else {
              resolve({ token: jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                data: mapUser(user),
              }, secret), user: mapUser(user)});
            }
          })
        }
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

export const getUserFromToken = async (token) => {
  return new Promise((resolve, reject) => {
    let decoded;
    try {
      decoded = jwt.verify(token, secret);
      console.log(decoded);
      resolve(decoded);
    } catch (err) {
      reject(err);
    }
  });
};

const mapUser = (user) => {
  return {
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    avatarUrl: `https://www.gravatar.com/avatar/${md5(user.email)}`
  };
};