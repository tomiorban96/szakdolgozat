import axios from 'axios';


export const authenticate = async (email, password) => {
  return new Promise((resolve, reject) => {
    axios.post('/api/auth/authenticate', {email, password})
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export const register = async (user) => {
  return new Promise((resolve, reject) => {
    axios.post('/api/auth/register', { ...user })
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getUser = async () => {
  return new Promise((resolve, reject) => {
    axios.get('/api/auth/user', {})
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        reject(error);
      })
  });
};

export const logOut = async () => {
  return new Promise((resolve, reject) => {
    axios.post('/api/auth/logout', {});
  });
};