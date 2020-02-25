import {
  Router
} from 'express';
import {
  listAll,
  addMany,
  findOne,
} from '../services/catalog';
export const router = Router();

router.get('/products', async (req, res) => {
  listAll()
    .then((products) => {
      res.status(200).json(products);
    })
    .catch(() => {
      res.status(400);
    });
});

router.get('/products/:id', async (req, res) => {
  findOne(req.params.id)
    .then((product) => {
      res.status(200).json(product);
    })
    .catch(() => {
      res.status(404).send();
    })
});

router.post('/products', async (req, res) => {
  addMany(req.body)
    .then((products) => {
      res.status(201).json(products);
    })
    .catch(() => {
      res.status(400).send();
    });
});