import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import deletedCompanyView from '../views/deleted_companies_view';
import DeletedCompany from '../models/DeletedCompany';

export default {
  async index(request: Request, response: Response){
    try{
      const deletedCompaniesRepository = getRepository(DeletedCompany);

      const deletedCompanies = await deletedCompaniesRepository.find({
        relations: ['deleted_company_images']
      });
      if(deletedCompanies){
        return response.json(deletedCompanyView.renderMany(deletedCompanies));
      }else{
        return response.json('Problemas Internos');
      }
    }catch(err){
      return response.json('Ops! Tivemos um Problema');
    }
  },

  async create(request: Request, response: Response){
    try{
      const {
        business,
        cnpj,
        name,
        phone,
        email,
        address,
        city,
        district,
        uf,
        password,
        is_active,
      } = request.body;

      console.log(request.body);
  
      const deletedCompaniesRepository = getRepository(DeletedCompany);
      const requestDeletedCompanyImages = request.files as Express.Multer.File[];
  
      const deleted_company_images = requestDeletedCompanyImages.map(deleted_company_image => {
        return { path: deleted_company_image.filename }
      })
  
      const data = {
        business,
        cnpj,
        name,
        phone,
        email,
        address,
        district,
        city,
        uf,
        password,
        is_active,
        deleted_company_images
      };
  
      const schema = Yup.object().shape({
        business: Yup.string().required(),
        cnpj: Yup.string().required(),
        name: Yup.string().required(),
        phone: Yup.string().required(),
        email: Yup.string().required(),
        address: Yup.string().required(),
        district:Yup.string().required(),
        city: Yup.string().required(),
        password: Yup.string().required(),
        deleted_company_images: Yup.array(
          Yup.object().shape({
            path: Yup.string().required()
          })
        )
      });
  
      await schema.validate(data, {
        abortEarly: false,
      });
  
      const deletedCompany = deletedCompaniesRepository.create(data);
      await deletedCompaniesRepository.save(deletedCompany);
  
      return response.status(201).json(deletedCompany);
    }catch(err){
      response.status(400).json(err);
    }
  }
}