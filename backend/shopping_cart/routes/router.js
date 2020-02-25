import {
  Router
} from 'express';
import {
  add
} from '../services/cart';
export const router = Router();

router.post('/', async (req, res) => {
  if (req.body.userId && req.body.itemId) {
    add(req.body.userId, req.body.itemId)
      .then(() => {
        res.status(201).send();
      })
      .catch((error) => {
        res.status(404).send();
      })
  } else {
    res.status(404).send();
  }
});
