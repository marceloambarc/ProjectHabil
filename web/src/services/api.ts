import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', 
  headers: {
    'Access-Control-Allow-Origin': false,

  },
  proxy: {
    host: '192.168.15.200:8008',
    port: 8008
  },
})

console.log(api);

export default api;

