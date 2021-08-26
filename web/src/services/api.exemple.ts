import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', 
  headers: {
    'Access-Control-Allow-Origin': "*",
    'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
  proxy: {
    host: 'http://000.00.0.000',
    port: 5000,
  },
});

export default api;