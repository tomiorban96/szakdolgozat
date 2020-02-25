import axios from 'axios';

export const listAll = () => {
  return new Promise((resolve, reject) => {
    axios.get('/api/catalog/products', {})
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};