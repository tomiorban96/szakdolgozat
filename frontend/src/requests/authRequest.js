import axios from 'axios';


export const authenticate = async (email, password) => {
  return new Promise((resolve, reject) => {
    axios.post('localhost:3000/authenticate', {email, password})
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
}