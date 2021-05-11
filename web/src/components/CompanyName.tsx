import React from 'react';
import { Company } from '../libs/companyProps';

export default function CompanyName({name, id}:any){
  return (
    <p>{name}</p>
  );
}