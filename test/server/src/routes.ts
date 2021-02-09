import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import CompaniesController from './controllers/CompaniesController';
import ProductsController from './controllers/ProductsController';
import DeletedCompaniesController from './controllers/DeletedCompanyController';
import AdminController from './controllers/AdminController';

const routes = Router();
const upload = multer(uploadConfig);

/*AUTH*/
routes.post('/auth', CompaniesController.auth);
routes.post('/adminauth', AdminController.adminauth);

/*PRODUCTS*/
routes.get('/products/company_id/:id', ProductsController.companyId);
routes.get('/products', ProductsController.index);
routes.get('/products/:id', ProductsController.show);
routes.delete('/products/:id', ProductsController.delete);
routes.put('/products', upload.array('images'),ProductsController.edit);
routes.post('/products', upload.array('images'),ProductsController.create);

/*COMPANIES*/
routes.get('/companies', CompaniesController.index);
routes.get('/companies/:id', CompaniesController.show);
routes.post('/companies', upload.array('company_images'),CompaniesController.create);
routes.put('/companies', CompaniesController.edit);
routes.delete('/companies/:id', CompaniesController.delete);

/*DELETED COMPANIES*/
routes.get('/deleted_companies', DeletedCompaniesController.index);
routes.post('/deleted_companies', upload.array('deleted_company_images'),DeletedCompaniesController.create);