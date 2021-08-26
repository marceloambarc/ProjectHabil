import axios from 'axios';

const zaptest = axios.create({
  baseURL: 'http://192.168.15.35:3030'
});

export default zaptest;