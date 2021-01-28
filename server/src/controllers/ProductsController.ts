import { Request, Response, Send } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import productView from '../views/products_view';
import Product from '../models/Product';
import Image from '../models/Image';

export default {
  async index(request: Request, response: Response) {
    try{
      const productsRepository = getRepository(Product);

      const products = await productsRepository.find({
        relations: ['images']
      });
      return response.json(productView.renderMany(products));
    }catch(err){
      return response.json({err: 'Ops! Tivemos um problema.'})
    }
  },

  async companyId(request: Request, response: Response ){
    try{
      const { id } = request.params;

      const productsRepository = getRepository(Product);

      const products = await productsRepository.find({
        relations: ['images'], where:{company_id:`${id}`}
      });

      if(products.length == 0){
        return response.json({id: '1', name: 'Nenhum produto Cadastrado'});
      }else{
        return response.json(productView.renderMany(products));
      }

    }catch(err){
      return response.json({err: "Ops! tivemos um problema."});
    }
  },

  async show(request: Request, response: Response) {
    try{
      const { id } = request.params;

      const productsRepository = getRepository(Product);
  
      const product = await productsRepository.findOneOrFail(id, {
        relations: ['images']
      });
      return response.json(productView.render(product));
    }catch(err){
      return response.json({err: 'Ops! Tivemos um Problema.'})
    }
  },

  async create(request: Request, response: Response) {

    try{
      const {
        name,
        price,
        description,
        date,
        company_id,
      } = request.body;
  
      const productsRepository = getRepository(Product);
  
      const requestImages = request.files as Express.Multer.File[];
  
      const images = requestImages.map(image => {
        return { path: image.filename }
      })
  
      const data = {
        name,
        price,
        description,
        date,
        company_id,
        images,
      };
  
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        price: Yup.string().required(),
        description: Yup.string().required(),
        date: Yup.string().required(),
        images: Yup.array(
          Yup.object().shape({
            path: Yup.string().required()
          })
        ),
        company_id: Yup.string().required()
      });
  
      await schema.validate(data, {
        abortEarly: false,
      });
  
      const product = productsRepository.create(data);
  
      await productsRepository.save(product);
  
      return response.status(201).json(product);
    }catch(err){
      return response.json({err: 'Entre em contato com a empresa!'})
    }
  },

  async delete(request: Request, response: Response){
    try{
      const { id } = request.params;

      const productsRepository = await getRepository(Product);

      const product = await productsRepository.findOneOrFail(id, {
        relations: ['images']
      });

      try{
        await productsRepository.remove(product);
        response.json('Tudo certo')
      }catch(err){
        response.status(400).json(err);
      }
    }catch(err){
      return response.json(err);
    }
  },

  async edit(request: Request, response: Response){
    try{
      const {
        id,
        name,
        price,
        description,
        date,
        company_id
      } = request.body;

      const requestImages = request.files as Express.Multer.File[];
      const images = requestImages.map(image => {
        return { path: image.filename }
      })

      const productsRepository = await getRepository(Product);
      const product = await productsRepository.findOneOrFail(id, {
        relations: ['images']
      });
      await productsRepository.remove(product);

      const data = {
        name,
        price,
        description,
        date,
        company_id,
        images,
      };

      const schema = Yup.object().shape({
        name: Yup.string().required(),
        price: Yup.string().required(),
        description: Yup.string().required(),
        date: Yup.string().required(),
        images: Yup.array(
          Yup.object().shape({
            path: Yup.string().required()
          })
        ),
        company_id: Yup.string().required()
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const newProduct = productsRepository.create(data);
  
      await productsRepository.save(newProduct);
  
      return response.status(201).json(newProduct);

    } catch(err){
      return response.json(err);
    }   
  }
}