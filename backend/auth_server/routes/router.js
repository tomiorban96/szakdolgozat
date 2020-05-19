import {
  Router
} from 'express';
import {
  authenticate,
  register,
  getUserFromToken
} from '../services/auth';
export const router = Router();

router.post('/authenticate', async (req, res) => {
  const {
    email,
    password
  } = req.body;
  authenticate(email, password)
    .then((result) => {
      res.cookie('token', result.token, {
        secure: false,
        httpOnly: true
      });
      res.status(200).json({
        ...result.user
      });
    })
    .catch(() => {
      res.status(400).json({
        status: 400,
        message: 'Email or password is incorrect'
      });
    })
});

router.post('/register', async (req, res) => {
  register(req.body)
    .then((user) => {
      authenticate(user.email, req.body.password)
        .then((result) => {
          res.cookie('token', result.token, {
            secure: false,
            httpOnly: true
          });
          res.status(200).json({
            ...result.user
          });
        })
        .catch((error) => {
          res.status(500).send();
        })
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        status: 400,
        message: 'User already exists'
      })
    });
});

router.get('/user', async (req, res) => {
  if (req.cookies.token) {
    getUserFromToken(req.cookies.token)
      .then(
        (user) => res.status(200).json(user)
      )
      .catch(
        () => res.status(401).send()
      );
  } else {
    res.status(401).send();
  }
});

router.post('/logout', async (req, res) => {
  res.clearCookie('token');
  res.status(200).send();
});