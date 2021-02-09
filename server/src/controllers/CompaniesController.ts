import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup'; 
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import {JWTSecret} from './secure/secret';

import companyView from '../views/companies_views';
import Company from '../models/Company';

export default {
  async edit(request: Request, response: Response){
    try{
      const { id, is_active } = request.body;
      try{
        const companiesRepository = await getRepository(Company);
        const company = await companiesRepository.findOneOrFail(id);
        try{
          company.is_active = is_active;
          try{
            await companiesRepository.save(company);
            return response.status(200).json("tudo certo");
          }catch(err){
            console.log(err);
          }
        }catch(err){
          console.log(err);
        }
      }catch(err){
        console.log(err);
      }
    }catch(err){
      console.log(err);
    }
  },

  /* INDEX */
  async index(request: Request, response: Response) {
    try{
      const companiesRepository = getRepository(Company); 
    
      const companies = await companiesRepository.find({
        relations: ['company_images']
      });
      if(companies){
        return response.json(companyView.renderMany(companies));
      }else{
        return response.json('Problemas Internos');
      }
    }catch(err){
      return response.json('Ops! Tivemos um problema');
    }
  },

  async show(request: Request, response: Response) {
    try{
      const { id } = request.params;

      const companiesRepository = getRepository(Company);
  
      const company = await companiesRepository.findOneOrFail(id, {
        relations: ['company_images']
      });
      if(company){
        return response.json(companyView.render(company));
      }else{
        return response.json('Problemas Internos');
      }
    }catch(err){
      return response.json('Ops! Tivemos um problema');
    }
  },


  /*  AUTHORIZATION */
  async auth(request: Request, response: Response) {
    try{
      const { cnpj, password } = request.body;
      if(!cnpj || !password){
        response.status(401).json({error: "Credenciais Inválidas"})
      }
      const companiesRepository = getRepository(Company);
    
      try{
        const company = await companiesRepository.findOne({cnpj},{
          relations: ['company_images']
        });
        if(company){
          {/*
          if(company.is_active > 0){
          */}
            var correct = bcrypt.compareSync(password,company.password);
            if(correct){
              jwt.sign({id: company.id, cnpj: company.cnpj, name: company.name}, JWTSecret,{expiresIn: '2h'}, (err, token) => {
                if(err){
                  response.status(400);
                  response.json({err: "Erro Interno"});
                }else{
                  response.status(200);
                  const col = response.json({token: token, name: company.name, id: company.id, images: company.company_images});
                }
              })
            }else{
            response.status(401).json({err: "Credenciais Inválidas"});
            }
          {/*
          }else{
            response.status(401).json({err: "Empresa em Análise"});
          }
          */}
        }else{
          response.status(401).json({err: "CNPJ inválido"});
        }
      }catch(err){
        response.status(400).json({ error: "Validation Error" })
      }
    }catch(err){
      response.status(401).json({error: "Credenciais Inválidas"})
    }
  },

  async delete(request: Request, response: Response){
    try{
      const { id } = request.params;

      const companiesRepository = await getRepository(Company);
      const company = await companiesRepository.findOneOrFail(id,{
        relations: ['company_images']
      });
      try{
        await companiesRepository.remove(company);
        response.json("Tudo certo");
      }catch(err){
        response.status(400).json(err);
      }
    }catch(err){
      response.status(400).json(err);
    }
  },

  /* CREATION */
  async create(request: Request, response: Response) {
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
    } = request.body;

    const passwordHash = request.body.password;

    const companiesRepository = getRepository(Company);
    const validateCompany = await companiesRepository.findOne({ cnpj });
    try {
      if(validateCompany){
        response.status(400).json({error:"Empresa já Cadastrado"});
      }
      const requestCompanyImages = request.files as Express.Multer.File[];

      const company_images = requestCompanyImages.map(company_image => {
        return { path: company_image.filename }
      })

      var salt = bcrypt.genSaltSync(3);
      var password = bcrypt.hashSync(passwordHash, salt);
  
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
        company_images
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
        company_images: Yup.array(
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
    }catch(err){
      response.status(400).json({ error: "Registro do Usuário Falhou" });
    }
  }
}