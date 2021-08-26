//PRODUCTION (SAME SERVER)
import axios from 'axios';

const prodApi = axios.create({
  baseURL: 'http://000.00.0.000',
});

//DEVELOPER

const devApi = axios.create({
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

export { devApi, prodApi };