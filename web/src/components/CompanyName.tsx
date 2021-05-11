import React from 'react';

interface Company {
  id: number;
  business: string;
  cnpj: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  district: string;
  city: string;
  uf: string;
  password: string;
  image: string;
  keywords: string;
  is_active: number;
  max_prom: number;
}

export default function CompanyName(data){
  return (
    <p>{data.id}</p>
  );
}