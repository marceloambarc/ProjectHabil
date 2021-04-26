import axios from 'axios';

const mailgun = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Access-Controle-Allow-Origin': false
    },
    proxy: {
        host: 'http://habil.servehttp.com',
        port: 5003,
    },
}); 

export default mailgun;