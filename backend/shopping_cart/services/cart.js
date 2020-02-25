import Cart from '../models/Cart';

export const add = async (userId, itemId) => {
  return new Promise((resolve, reject) => {
    Cart.findOneAndUpdate({ userId },
      { '$push': { 'itemIds': itemId }},
      {'upsert': true })
      .then((cart) => {
        console.log(cart);
        resolve(cart);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

export const remove = async (userId, itemId) => {
  return new Promise((resolve, reject) => {
    Cart.findOneAndRemove({})
  });
};

export const list = async (userId) => {
  return new Promise((resolve, reject) => {
    
  });
};
