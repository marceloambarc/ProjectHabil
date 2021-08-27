import axios from 'axios';

const whatsapp = axios.create({
  baseURL: 'http://000.000.00.00:3000'
});

export default whatsapp;