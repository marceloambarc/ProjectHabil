import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import CompaniesController from './controllers/CompaniesController';
import ProductsController from './controllers/ProductsController';

const routes = Router();
const upload = multer(uploadConfig);

routes.post('/auth', CompaniesController.auth);

routes.get('/products', ProductsController.index);
routes.get('/products/:id', ProductsController.show);
routes.post('/products', upload.array('images'),ProductsController.create);

routes.get('/companies', CompaniesController.index);
routes.get('/companies/:id', CompaniesController.show);
routes.post('/companies', upload.array('companyImages'),CompaniesController.create);

export default routes;