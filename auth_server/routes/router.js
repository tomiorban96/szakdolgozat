import {
  Router
} from 'express';
import {
  authenticate,
  register
} from '../services/auth';
export const router = Router();

router.post('/authenticate', async (req, res) => {
  const {
    email,
    password
  } = req.body;
  authenticate(email, password)
    .then((token) => {
      res.cookie('token', token, {
        expires: new Date(Date.now() + 100),
        secure: false,
        httpOnly: true
      });
      res.status(200).json({
        status: 200
      });
    })
    .catch(() => {
      res.status(400).json({
        status: 400,
        message: 'Username or password is incorrect'
      });
    })
});

router.post('/register', async (req, res) => {
  const {
    email,
    password
  } = req.body;
  register(email, password)
    .then((user) => {
      res.status(201).json({
        status: 201,
        data: user
      })
    })
    .catch(() => {
      res.status(400).json({
        status: 400,
        message: 'User already exists'
      })
    });
});