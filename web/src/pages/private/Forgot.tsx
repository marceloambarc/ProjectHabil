import React, { useEffect, useState } from 'react';
import { FaKey } from 'react-icons/fa';

import Sidebar from '../../components/Sidebar'
import api from '../../services/api';

interface Company {
  id: number;
  name: string;
  business: string;
  cnpj: string;
}

function Forgot(){
  const [isLoading, setIsLoading] = useState(false);
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    if(isLoading) return;

    setIsLoading(true);
    api.get('companies/all').then(response => {
      setCompanies(response.data);
      setIsLoading(false);
    }).catch(err => {
      alert('Ops! Tivemos um Erro');
    })
  },[]);

  async function handleSubmitTemporaryPassword({company}:{company:Company}){
    alert("SUCCESS!");
  }

  function renderButton({company}:{company: Company}){
    return(
      <div className="button-row">
        <div className="button-col">
          <button className="aprove" onClick={() => handleSubmitTemporaryPassword({company})}>
            <FaKey size="13" color="#FFF" />
          </button>
        </div>
      </div>
    );
  }

  // TABELA EM COMPONENTE
  function renderTable(){
    if(isLoading){
      return (
        <div>
          <h1>CARREGANDO...</h1>
        </div>
      );
    }else{
      return (
        <table id="companies">
        <tbody>
        <tr>
          <th>ID</th>
          <th>Empresa</th>
          <th>cnpj</th>
          <th className="noWrap td">Comandos</th>
        </tr>

        {companies.map(company => {
          // ACTIVE MANIPULADO NO USESTATE()
          return(
              <tr key={company.id}>
              <td>{company.id}</td>
              <td>{company.name}</td>
              <td>{company.cnpj}</td>
              <td>
                {renderButton({company})}
              </td>
            </tr>
          );
        })}
        </tbody>
      </table>
      );
    }
  }
  return (
    <div id="page-control-map">
      <Sidebar />
      <main>
        <div className="control-map">

          <h1 style={{fontSize:'22px'}}>Solicitacao de Novas Senhas.</h1>
        </div>
        <div className="table-container">
          {renderTable()}
        </div>
      </main>
    </div>
  );
}
export default Forgot;