import React, { useState, useEffect } from 'react';
import { FiDollarSign, FiLayers, FiBookOpen, 
FiArrowDownCircle, FiAlertOctagon, FiCheck, 
FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

import Sidebar from '../../components/Sidebar'
import api from '../../services/api';

import '../../styles/pages/controlmap.css';
import '../../styles/pages/card.css';
import '../../styles/pages/card-columns.css';

interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
  date: string;
  company_id: number;
  image: string;
  validate: string;
  discount: string;
  is_active: string;
}

interface Company {
  id: number;
  name: string;
}

function Products(){
  const [products, setProducts] = useState<Product[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [active, setActive] = useState('0');
  const [validate, setValidate] = useState('');
  const [base] = useState('data:image/png;base64');

  useEffect(() => {
    api.get('companies/all').then(response => {
      setCompanies(response.data);
    })
    api.get('products').then(response => {
      setProducts(response.data);
    });
  }, []);

   //----EXPAND IMAGE---//
   async function handleExpandImage({products}:any){
    alert(`Ver imagem ${products.image}`);
  }

  //---CANCEL AND ACTIVE BUTTON FUNCTIONS---//
  async function handleCanceled({products}:{products:any}){
    api.delete(`products/${products.id}`).then(() => {
      api.get('products').then(response => {
        setProducts(response.data);
      });
    }).catch(err => {
      alert(err);
    });
  }

  //----VIEWS----///
  async function handleViewInactive(){
    setActive('0')
  }

  async function handleViewActive(){
    setActive('1')
  }

  async function handleActive({products}:{products:any}){
    api.put(`products/${products.id}`,{
      is_active: 1,
    }).then(() => {
      api.get('products').then(response => {
        setProducts(response.data);
      });
    }).catch(err => {
      alert(err);
    });
  }

    // RENDERIZAR BOTOES NA TABELA ATIVAS(1) - INATIVAS(0) - CANCELADAS(2)
  function renderButton({products}:{products:any}){
    return(
      <div className="button-row">
        <div className="button-col">
          <button className="cancel" onClick={() => handleCanceled({products})}>
            <FiAlertOctagon size="13" color="#FFF" />
          </button>
        </div>
            
        <div className="button-col">
          <button className="aprove" onClick={() => handleActive({products})}>
            <FiCheck size="13" color="#FFF" />
          </button>
        </div>
      </div>
      );
    }

  //-----SORT-----//
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

  //---CHANGE VALIDATE----//
  async function handleChange({input}:any){
    setValidate(input);
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
           <table id="companies">
            <tbody>
            <tr>
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

            {products.map(products => {
              if(products.is_active == active){
                return(
                    <tr key={products.id}>
                    <td>{products.name}</td>
                    <td>{products.price}</td>
                    <td>{products.description}</td>
                    <td>{products.date}</td>
                    <td>{products.company_id}</td>
                    <td><input type="date" value={validate} onChange={input => handleChange(input)} /></td>
                    <td>{products.discount} %</td>
                    <td onClick={() => handleExpandImage({products})}><img src={base + ',' + products.image} style={{width: '20%', cursor: 'pointer'}} className="landingImg" alt="CompreMaisAki" /></td>
                    <td>
                      {renderButton({products})}
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