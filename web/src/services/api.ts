import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', 
  headers: {
    'Access-Control-Allow-Origin': "*",
    'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
  proxy: {
    host: 'http://177.10.0.125',
    port: 5001,
  },
});

export default api;