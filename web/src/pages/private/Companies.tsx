import React, { useState, useEffect } from 'react';
import { FiAlertOctagon, FiCheck, FiCheckCircle, FiAlertCircle, FiXCircle, FiBook } from 'react-icons/fi';

import Sidebar from '../../components/Sidebar'
import api from '../../services/api';

import '../../styles/pages/controlmap.css';
import '../../styles/pages/companies_buttons.css';
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
  keywords: string;
  password: string;
  image: string;
  is_active: string;
}

function Products(){
  const [companies, setCompanies] = useState<Company[]>([]);
  const [active, setActive] = useState('0');
  const [base] = useState('data:image/png;base64');

  useEffect(() => {
    api.get('companies/all').then(response => {
      setCompanies(response.data);
      console.log(response.data);
    });
  }, []);


  async function handleViewActive(){
    try{
      api.get('companies').then(response => {
        setCompanies(response.data);
        setActive('1');
      });
    }catch(err){
      alert(err);
    }
  }

  async function handleViewCanceled(){
    try{
      api.get('deleted_companies').then(response => {
        setCompanies(response.data);
      })
    }catch(err){
      alert(err);
    }
  }

  async function handleViewInactive(){
    try{
      api.get('companies/all').then(response => {
        setCompanies(response.data);
        setActive('0');
      });
    }catch(err){
      alert(err);
    }
  }

  async function handleInactive({company}:{company:any}){
    try{
      api.put('companies',{
        id: company.id,
        is_active: 0,
      }).then(() => {
        api.get('companies').then(response => {
          setCompanies(response.data);
        });
      });
    }catch(err){
      alert(err);
    }
  }

  async function handleCanceled({company}:{company:any}){
    try{
      api.put('companies',{
        id: company.id,
        is_active: 2,
      }).then(() => {
        api.delete(`companies/${company.id}`).then(() => {
          api.get('companies').then(response => {
            setCompanies(response.data);
          })
        })
      })
    }catch(err){
      alert(err);
    }
  }

  async function handleActive({company}:{company:any}){
    try{
      api.put('companies',{
        id: company.id,
        is_active: 1,
      }).then(() => {
        api.get('companies').then(response => {
          setCompanies(response.data);
        });
      });
    }catch(err){
      alert(err);
    }
  }

  function renderButton({company}:{company:any}){
    if(active == "0"){
      return(
        <div className="button-row">
          <div className="button-col">
            <button className="cancel" onClick={() => handleCanceled({company})}>
              <FiAlertOctagon size="13" color="#FFF" />
            </button>
          </div>
          
          <div className="button-col">
            <button className="aprove" onClick={() => handleActive({company})}>
              <FiCheck size="13" color="#FFF" />
            </button>
          </div>
        </div>
      );
    }else if(active == "1"){
      return (
        <div className="button-row">
          <div className="button-col">
            <button className="inactive" onClick={() => handleInactive({company})}>
              <FiBook size="13" color="#FFF" />
            </button>
          </div>
          
          <div className="button-col">
            <button className="cancel" onClick={() => handleCanceled({company})}>
              <FiAlertOctagon size="13" color="#FFF" />
            </button>
          </div>
        </div>
      );
    }
  }

  return(
    <div id="page-control-map">
      <Sidebar />
      <main>
        <div className="control-map">

          <h1>Administração de Empresas</h1>

          <div className="companies-button-wrapper">

            <div className="companies-button">
              <label htmlFor="about">Ativas</label>
              <button onClick={() => handleViewActive()} id="button">
                <FiCheckCircle size="26" />
              </button>
            </div>

            <div className="companies-button">
              <label htmlFor="about">Inativas</label>
              <button onClick={() => handleViewInactive()} id="button">
                <FiAlertCircle size="26" />
              </button>
            </div>

            <div className="companies-button">
              <label htmlFor="about">Canceladas</label>
              <button onClick={() => handleViewCanceled()} id="button">
                <FiXCircle size="26" />
              </button>
            </div>

          </div>
          
          <div className="table-container">
           <table id="companies">
            <tbody>
            <tr>
              <th>Empresa</th>
              <th>Ramo</th>
              <th>Palavras-Chaves</th>
              <th>cnpj</th>
              <th>Telefone</th>
              <th>Email</th>
              <th>Endereço</th>
              <th>Bairro</th>
              <th>Cidade</th>
              <th>UF</th>
              <th>Foto</th>
              <th className="noWrap">Comandos</th>
            </tr>

            {companies.map(company => {
              if(company.is_active == active){
                return(
                    <tr key={company.id}>
                    <td>{company.name}</td>
                    <td>{company.business}</td>
                    <td>{company.keywords}</td>
                    <td>{company.cnpj}</td>
                    <td>{company.phone}</td>
                    <td>{company.email}</td>
                    <td>{company.address}</td>
                    <td>{company.district}</td>
                    <td>{company.city}</td>
                    <td>{company.uf}</td>
                    <td onClick={() => {}}><img src={base + ',' + company.image} style={{width: '70%'}} className="landingImg" alt="CompreMaisAki" /></td>
                    <td>
                      {renderButton({company})}
                    </td>
                  </tr>
                );
              }else{
                return;
              }
            })}
            </tbody>
          </table>

          </div>
        </div>
      </main>
    </div>
  );
}

export default Products;