import Product from '../models/Product';

export const listAll = async () => {
  return new Promise((resolve, reject) => {
    Product.find({})
      .then((products) => {
        resolve(products);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const addMany = async (products) => {
  return new Promise((resolve, reject) => {
    Product.insertMany(products)
      .then((products) => {
        resolve(products);
      })
      .catch((error) => {
        reject(error);
      });
  });
};