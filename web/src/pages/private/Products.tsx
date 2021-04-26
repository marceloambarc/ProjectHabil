import React, { useState, useEffect } from 'react';
import { FiDollarSign, FiLayers, FiBookOpen, 
FiArrowDownCircle, FiAlertOctagon, FiCheck, 
FiCheckCircle, FiAlertCircle, FiBook } from 'react-icons/fi';

import Sidebar from '../../components/Sidebar'
import api from '../../services/api';

import '../../styles/pages/controlmap.css';
import '../../styles/pages/card.css';
import '../../styles/pages/card-columns.css';

{/* 
  --- TO DO LIST
  Modificar o "id" da empresa para Nome 'string'
  Ordenar com os botos os produtos

  Sort de visualizacao dos produtos
*/}

interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
  date: string;
  company_id: number;
  image: string;
  validade: string;
  discount: string;
  is_active: string;
}

interface Company {
  id: number;
  name: string;
}

interface Validate {
  test: any
}

function Products(){
  const [products, setProducts] = useState<Product[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [active, setActive] = useState('0');
  const [validate, setValidate] = useState('');
  const [base] = useState('data:image/png;base64');
  const [userToken, setUserToken] = useState('retrieve from localStorage');
  const [isLoading, setIsLoading] = useState(false);

  //----CARREGAMENTO DE DADOS E LOADING INICIAL DE TELA ----///
  useEffect(() => {
    if(isLoading) return;

    //Iniciar Carregamento
    setIsLoading(true);

    //Carregamento de empresas
    api.get('products/all').then(products => {

      //Realocar Resposta para UseState
      setProducts(products.data);

      //Carregar empresas para nomeclatura na coluna "EMPRESA"
      api.get('companies/all').then(companies => {
        setCompanies(companies.data)
      }).catch(err => {
        alert('Ops! Tivemos um erro.');
      });

      //Realocar Token
      const getUserToken = localStorage.getItem('userToken');
      setUserToken(`${getUserToken}`);

      //Finalizar Carregamento
      setIsLoading(false);
    }).catch(err => {
      alert("Ops! Tivemos um erro");
    })
  }, []);

    //----RENDERIZAR TÍTULO DA TABELA
    function renderTitle(){
      if(active == '0'){
        return(
          <h1 style={{fontSize:'22px'}}>Promoções Inativas</h1>
        )
      }else{
        return(
          <h1 style={{fontSize:'22px'}}>Promoções Ativas</h1>  
        )
      }
    }

   //----(PENDENT)EXPAND IMAGE---//
   async function handleExpandImage({product}:{product:Product}){
    alert(`Ver imagem ${product.image}`);
  }

  //---CANCEL/ACTIVE/INACTIVE BUTTON FUNCTIONS---//
  async function handleCanceled({product}:{product:Product}){
    api.delete(`products/${product.id}`,{
      headers: {'Authorization': 'Bearer '+userToken}
    }).then(() => {
      api.get('products/all').then(response => {
        setProducts(response.data);
      });
    }).catch(err => {
      alert('Tivemos um erro, entre em contato com o Suporte');
    });
  }

  async function handleActive({product}:{product:Product}){
    api.put(`products/${product.id}`,{
      is_active: 1,
      validate: validate
    },{
      headers: {'Authorization': 'Bearer '+userToken}
    }).then(res => {
      api.get('products/all').then(response => {
        setProducts(response.data);
      });
    }).catch(err => {
      alert('Tivemos um erro, entre em contato com o Suporte');
    });
  }

  async function handleInactive({product}:{product:Product}){
    api.put(`products/${product.id}`,{
      is_active: 0,
    },{
      headers: {'Authorization': 'Bearer '+userToken}
    }).then(() => {
      api.get('products/all').then(response => {
        setProducts(response.data);
      });
    }).catch(err => {
      alert('Tivemos um erro, entre em contato com o Suporte');
    });
  }

  //----VIEWS----///
  async function handleViewInactive(){
    setActive('0')
  }

  async function handleViewActive(){
    setActive('1')
  }

  // RENDERIZAR BOTOES NA TABELA ATIVAS(1) - INATIVAS(0) - NAO POSSUI CANCELADAS
  function renderButton({product}:{product:Product}){
    if(active == '0'){
      return(
        <div className="button-row">
          <div className="button-col">
            <button className="cancel" onClick={() => handleCanceled({product})}>
              <FiAlertOctagon size="13" color="#FFF" />
            </button>
          </div>
              
          <div className="button-col">
            <button className="aprove" onClick={() => handleActive({product})}>
              <FiCheck size="13" color="#FFF" />
            </button>
          </div>
        </div>
      );
    }else if(active == '1'){
      return(
        <div className="button-row">
          <div className="button-col">
            <button className="cancel" onClick={() => handleCanceled({product})}>
              <FiAlertOctagon size="13" color="#FFF" />
            </button>
          </div>
              
          <div className="button-col">
            <button className="inactive" onClick={() => handleInactive({product})}>
              <FiBook size="13" color="#FFF" />
            </button>
          </div>
        </div>
      );
    }
  }

  async function handleSetValidate(product:Product, event:string){
    api.put(`products/${product.id}`,{
      validade: event
    },{
      headers: {'Authorization': 'Bearer '+userToken}
    }).then(() => {
      api.get('products/all').then(response => {
        setProducts(response.data);
      });
    }).catch(err => {
      alert('Tivemos um erro, entre em contato com o Suporte');
    })
  }

    // RENDERIZAR INPUT DE DATA INVÁLIDOS - RETORNAR VALOR DA DATA PARA VÁLIDOS 
  function renderValidate({product}:{product:Product}){
    if(active == '0' && product.validade == ""){
      return (
        <input type="date" value={validate} onChange={event => handleSetValidate(product, event.target.value)} />
      );
    }else if(active == '0' && product.validade != ""){
      return (
        <input type="date" value={product.validade} min={Date.now()} onChange={event => handleSetValidate(product, event.target.value)} />
      );
    }else{
      return (
        <p>{product.validade}</p>
      );
    }
  }

  //-----(PENDENT)SORT-----//
  async function handleViewPerDesc(){
    alert('DESC');
  }

  async function handleViewPerCompany(){
    alert('Company');
  }

  async function handleViewAlpha(){
    alert('AZ');
  }

  async function handleViewPerPrice(){
   alert('Price');
  }

  return(
    <div id="page-control-map">
      <Sidebar />
      <main>
        <div className="control-map">

          <h1 style={{fontSize:'22px'}}>Novas Promoções Cadastradas</h1>

          <div className="companies-button-wrapper">

            <div className="companies-button">
              <label htmlFor="about">Últimas</label>
              <button onClick={() => handleViewPerDesc()} id="button">
                <FiLayers size="26" />
              </button>
            </div>

            <div className="companies-button">
              <label htmlFor="about">Empresas</label>
              <button onClick={() => handleViewPerCompany()} id="button">
                <FiBookOpen size="26" />
              </button>
            </div>

            <div className="companies-button">
              <label htmlFor="about">A-Z</label>
              <button onClick={() => handleViewAlpha()} id="button">
                <FiArrowDownCircle size="26" />
              </button>
            </div>

            <div className="companies-button">
              <label htmlFor="about">Preço</label>
              <button onClick={() => handleViewPerPrice()} id="button">
                <FiDollarSign size="26" />
              </button>
            </div>

          </div>

          <div className="companies-button-wrapper">
            <div className="companies-button">
              <label htmlFor="about">Ativas</label>
              <button onClick={() => handleViewActive()} id="button">
                <FiCheckCircle size="26" color="#FFF" />
              </button>
            </div>

            <div className="companies-button">
              <label htmlFor="about">Inativas</label>
              <button onClick={() => handleViewInactive()} id="button">
                <FiAlertCircle size="26" color="#FFF" />
              </button>
            </div>
          </div>
          
          <div className="table-container">
            {renderTitle()}
           <table id="companies">
            <tbody>
            <tr>
              <th>ID</th>
              <th>Produto</th>
              <th>Preco</th>
              <th>Descricao</th>
              <th>Data</th>
              <th>Empresa</th>
              <th>Validade</th>
              <th>Desconto</th>
              <th>Imagem</th>
              <th className="noWrap">Comandos</th>
            </tr>

            {products.map(product => {
              if(product.is_active == active){
                return(
                    <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>R$ {product.price}</td>
                    <td>{product.description}</td>
                    <td>{product.date}</td>
                    <td>{product.company_id}</td>
                    <td>
                      {renderValidate({product})}
                    </td>
                    <td>{product.discount} %</td>
                    <td onClick={() => handleExpandImage({product})}><img src={base + ',' + product.image} style={{width: '30%', cursor: 'pointer'}} className="landingImg" alt="CompreMaisAki" /></td>
                    <td>
                      {renderButton({product})}
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

function usePrevious(validate: string) {
  throw new Error('Function not implemented.');
}
