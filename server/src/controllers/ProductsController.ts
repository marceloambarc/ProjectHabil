import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import productView from '../views/products_view';
import * as Yup from 'yup';

import Product from '../models/Product';

export default {
  async index(request: Request, response: Response) {
    const productsRepository = getRepository(Product);

    const products = await productsRepository.find({
      relations: ['images']
    });
    return response.json(productView.renderMany(products));
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const productsRepository = getRepository(Product);

    const product = await productsRepository.findOneOrFail(id, {
      relations: ['images']
    });
    return response.json(productView.render(product));
  },

  async create(request: Request, response: Response) {
    console.log(request.files);

    const {
      name,
      price,
      description,
      date,
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
      images
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
      )
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const product = productsRepository.create(data);

    await productsRepository.save(product);

    return response.status(201).json(product);

  }

}