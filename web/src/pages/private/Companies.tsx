import React, { useState, useEffect } from 'react';
import { FiAlertOctagon, FiCheck, FiCheckCircle, 
FiAlertCircle, FiXCircle, FiBook } from 'react-icons/fi';

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
  password: string;
  image: string;
  keywords: string;
  is_active: string;
}

//SORT POR ÚLTIMAS CADASTRADAS
function Products(){
  const [companies, setCompanies] = useState<Company[]>([]);
  const [active, setActive] = useState('0');
  const [base] = useState('data:image/png;base64');
  const [userToken, setUserToken] = useState('retrieve from localStorage');
  const [isLoading, setIsLoading] = useState(false);

  //----CARREGAMENTO DE DADOS E LOADING INICIAL DE TELA ----///
  useEffect(() => {
    if(isLoading) return;

    //Iniciar Carregamento
    setIsLoading(true);
    api.get('companies/all').then(response => {

      //Realocar Resposta para UseState
      setCompanies(response.data);

      //Realocar Token
      const getUserToken = localStorage.getItem('userToken');
      setUserToken(`${getUserToken}`);

      //Finalizar Carregamento
      setIsLoading(false);

    }).catch(err => {
      alert('Ops! Tivemos um Erro.');
    })
  }, []);

  //----RENDERIZAR TÍTULO DA TABELA
  function renderTitle(){
    if(active == '0'){
      return(
        <h1 style={{fontSize:'22px'}}>Empresas Inativas</h1>
      );
    }else if(active == '1'){
      return(
        <h1 style={{fontSize:'22px'}}>Empresas Ativas</h1>  
      );
    }else{
      return(
        <h1 style={{fontSize:'22px'}}>Empresas Canceladas</h1>
      );
    }
  }

  //----(PENDENTE) EXPAND IMAGE---//
  async function handleExpandImage({company}:{company:Company}){
     alert(`${company.image}`);
  }

  //-----VIEWS------//
  async function handleViewInactive(){
    setActive('0')
  }

  async function handleViewActive(){
    setActive('1')
  }

  async function handleViewCanceled(){
    setActive('2')
  }

  //---MANIPULAR EMPRESAS (INSERIR CARREGAMENTO VISUAL)---//
  async function handleInactive({company}:{company:Company}){
    api.put(`companies/${company.id}`,{
      // 0 === Empresa INATIVA
      is_active: 0,
    },{
      headers: {'Authorization': 'Bearer '+userToken}
    }).then(() => {
      api.get('companies/all').then(response => {
        setCompanies(response.data);
      });
    }).catch(err => {
      alert('Tivemos um erro, entre em contato com o Suporte');
    });
  }

  async function handleCanceled({company}:{company:Company}){
    api.delete(`companies/${company.id}`,{
      headers: {'Authorization': 'Bearer '+userToken}
    }).then(() => {
      api.get('companies/all').then(response => {
        setCompanies(response.data);
      });
    }).catch(err => {
      alert('Tivemos um erro, entre em contato com o Suporte');
    });
  }

  async function handleActive({company}:{company:Company}){
    api.put(`companies/${company.id}`,{
      // 1 === Empresa ATIVA
      is_active: 1,
    },{
      headers: {'Authorization': 'Bearer '+userToken}
    }).then(() => {
      api.get('companies/all').then(response => {
        setCompanies(response.data);
      });
    }).catch(err => {
      alert('Tivemos um erro, entre em contato com o Suporte');
    });
  }

  // RENDERIZAR BOTOES NA TABELA ATIVAS(1) - INATIVAS(0) - CANCELADAS(2)
  function renderButton({company}:{company:Company}){
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
          <th className="noWrap td">Comandos</th>
        </tr>

        {companies.map(company => {
          // ACTIVE MANIPULADO NO USESTATE()
          if(company.is_active == active){
            return(
                <tr key={company.id}>
                <td>{company.id}</td>
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
                <td onClick={() => handleExpandImage({company})}><img src={base + ',' + company.image} style={{width: '100%', cursor: 'pointer'}} className="landingImg" alt="CompreMaisAki" /></td>
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
      );
    }
  }

  return(
    <div id="page-control-map">
      <Sidebar />
      <main>
        <div className="control-map">

          <h1 style={{fontSize:'22px'}}>Administração de Empresas</h1>

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
          {renderTitle()}
          {renderTable()}

          </div>
        </div>
      </main>
    </div>
  );
}

export default Products;