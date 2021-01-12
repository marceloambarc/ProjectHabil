import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import companyView from '../views/companies_views';
import * as Yup from 'yup';
import jwt from 'jsonwebtoken';

import { JWTSecret } from '../secure/secret';
import Company from '../models/Company';

export default {
  async index(request: Request, response: Response) {
    const companiesRepository = getRepository(Company); 
    
    const companies = await companiesRepository.find({
      relations: ['companyImages']
    });
    return response.json(companyView.renderMany(companies));
  },

  async auth(request: Request, response: Response) {
    const { cnpj, password } = request.body;
    const companiesRepository = getRepository(Company);
    
    try{
      const company = await companiesRepository.findOne({ cnpj });
      if(company){
        if(company.password == password){
          jwt.sign({id: company.id, cnpj: company.cnpj}, JWTSecret,{expiresIn: '2h'}, (err, token) => {
            if(err){
              response.status(400);
              response.json({err: "Erro Interno"});
            }else{
              response.status(200);
              response.json({token: token});
            }
          })
        }else{
         response.status(401);
         response.json({err: "Credenciais Inválidas"});
        }
      }else{
        response.status(401);
        response.json({err: "CNPJ inválido"});
      }
    }catch(err){
      response.status(400).json({ error: "Validation Error" })
    }
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const companiesRepository = getRepository(Company);

    const company = await companiesRepository.findOneOrFail(id, {
      relations: ['companyImages']
    });
    return response.json(companyView.render(company));
  },

  async create(request: Request, response: Response) {
    console.log(request.files);

    const {
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
    } = request.body;

    const companiesRepository = getRepository(Company);

    const requestCompanyImages = request.files as Express.Multer.File[];

    const companyImages = requestCompanyImages.map(companyImage => {
      return { path: companyImage.filename }
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
      companyImages
    };

    const schema = Yup.object().shape({
      business: Yup.string().required(),
      cnpj: Yup.string().required(),
      name: Yup.string().required(),
      phone: Yup.string().required(),
      email: Yup.string().required(),
      address: Yup.string().required(),
      district: Yup.string().required(),
      city: Yup.string().required(),
      password: Yup.string().required(),
      companyImages: Yup.array(
        Yup.object().shape({
          path: Yup.string().required()
        })
      )
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const company = companiesRepository.create(data);

    await companiesRepository.save(company);

    return response.status(201).json(company);
  }
}