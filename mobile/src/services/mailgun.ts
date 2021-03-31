import axios from 'axios';
import { MAIL_URL } from '../../url.json';

const mailgun = axios.create({
    baseURL: MAIL_URL,
}); 

export default mailgun;