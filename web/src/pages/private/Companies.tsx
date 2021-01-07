import React, { useState, useEffect } from 'react';
import { FiAlertOctagon, FiCheck } from 'react-icons/fi';

import Sidebar from '../../components/Sidebar'
import api from '../../services/api';

import '../../styles/pages/controlmap.css';
import '../../styles/pages/table.css';

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
  company_images: Array<{
    id: number;
    url: string;
  }>;
}

function Products(){

  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    api.get('companies').then(response => {
      setCompanies(response.data);
    });
  }, []);

  return(
    <div id="page-control-map">
      <Sidebar />
      <main>
        <div className="control-map">

          <h1>Novas Empresas Cadastradas</h1>
          
          <div className="table-container">
           <table id="companies">
            <tbody>
            <tr>
              <th>Empresa</th>
              <th>Ramo</th>
              <th>cnpj</th>
              <th>Telefone</th>
              <th>Email</th>
              <th>Endereço</th>
              <th>Bairro</th>
              <th>Cidade</th>
              <th>UF</th>
              <th>Foto</th>
              <th></th>
            </tr>

            {companies.map(company => {return(
            <tr>
              <td>{company.name}</td>
              <td>{company.business}</td>
              <td>{company.cnpj}</td>
              <td>{company.phone}</td>
              <td>{company.email}</td>
              <td>{company.address}</td>
              <td>{company.district}</td>
              <td>{company.city}</td>
              <td>{company.uf}</td>
              <td>Placeholder</td>
              <td>
                <div className="button-row">
                  <div className="button-col">
                    <button className="cancel">
                      <FiAlertOctagon size="13" color="#FFF" />
                    </button>
                  </div>
                  
                  <div className="button-col">
                    <button className="aprove">
                      <FiCheck size="13" color="#FFF" />
                    </button>
                  </div>
                </div>
              </td>
            </tr>

            )})}
            </tbody>
          </table>

          </div>
        </div>
      </main>
    </div>
  );
}

export default Products;