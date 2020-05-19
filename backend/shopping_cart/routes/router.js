import {
  Router
} from 'express';
import {
  add, remove
} from '../services/cart';
export const router = Router();

router.put('/', async (req, res) => {
  if (req.body.userId && req.body.itemId) {
    add(req.body.userId, req.body.itemId)
      .then(() => {
        res.status(200).send();
      })
      .catch((error) => {
        res.status(404).send();
      })
  } else {
    res.status(404).send();
  }
});

router.delete('/', async (req, res) => {
  if (req.body.userId && req.body.itemId) {
    remove(req.body.userId, req.body.itemId)
    .then((cart) => {
      res.status(200).send();
    })
    .catch((error) => {
      res.status(404).send();
    })
  } else {
    res.status(404).send();
  }
});

router.get('/')
