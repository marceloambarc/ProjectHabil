import React, { useState, useEffect } from 'react';

import api from '../services/api';

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
  is_active: string;
  max_prom: number;
}

export default function CompanyName({companyId}:any){
  const [isLoading, setIsLoading] = useState(true);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [companyName, setCompanyName] = useState('');

  async function getCompanies(){
    const repositories = await api.get('companies/all');
    setCompanies(repositories.data);
  }

  async function getCompanyName(){
    companies.map(company => {
      if(company.id == companyId){
        setCompanyName(company.name);
      }
    })
  }

  useEffect(() => {
    if(!isLoading) return;
    getCompanies();
    getCompanyName();
    setIsLoading(false);
  },[]);

  if(isLoading){
    return(
      <h1>Hello World!</h1>
    )
  }
  return(
    <>
      {companyName}
    </>
  );
}