import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', 
  headers: {
    'Access-Control-Allow-Origin': false,
  },
  proxy: {
    host: 'http://habil.servehttp.com',
    port: 5001,
  },
});

export default api;

