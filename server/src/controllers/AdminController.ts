import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import {JWTSecret} from './secure/secret';

import Admin from '../models/Admin';

export default {

  /*  AUTHORIZATION */
  async adminauth(request: Request, response: Response) {
    const { user, password } = request.body;
    const companiesRepository = getRepository(Admin);
    
    try{
      const admin = await companiesRepository.findOne({ user });
      if(admin){
        if(admin.password == password){
          response.status(200).json({ correct: "Correct" });
        }else{
         response.status(401);
         response.json({err: "Credenciais Inválidas"});
        }
      }else{
        response.status(401);
        response.json({err: "Usuário inválido"});
      }
    }catch(err){
      response.status(400).json({ error: "Validation Error" })
    }
  }
}
