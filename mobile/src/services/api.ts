import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.15.200:8008/v1/',
}); 

export default api;