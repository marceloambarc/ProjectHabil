import React, { useState, useEffect } from 'react';
import { FiDollarSign, FiLayers, FiBookOpen, FiArrowDownCircle } from 'react-icons/fi';

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
  is_active: number;
}

function Products(){
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    api.get('products').then(response => {
      setProducts(response.data);
    });
  }, []);

  async function handleDelete({product}:{product:any}){
    try{
      let isDelete = window.confirm(`Deseja Rejeitar ${product.name}?`);
      if(isDelete){
        api.delete(`products/${product.id}`).then(() => {
          api.get('products').then(response => {
            setProducts(response.data);
          });
        });
      }
    }catch(err){
      alert(err);
    }
  }

  async function handleViewPerPrice(){
    console.log('Price');
  }

  async function handleViewPerDesc(){
    console.log('DESC');
  }

  async function handleViewInactive(){
    console.log('Tester');
  }

  return(
    <div id="page-control-map">
      <Sidebar />
      <main>
        <div className="control-map">

          <h1>Novas Promoções Cadastradas</h1>

          <div className="companies-button-wrapper">

            <div className="companies-button">
              <label htmlFor="about">Últimas</label>
              <button onClick={() => handleViewPerDesc()} id="button">
                <FiLayers size="26" />
              </button>
            </div>

            <div className="companies-button">
              <label htmlFor="about">Empresas</label>
              <button onClick={() => {}} id="button">
                <FiBookOpen size="26" />
              </button>
            </div>

            <div className="companies-button">
              <label htmlFor="about">A-Z</label>
              <button onClick={() => handleViewInactive()} id="button">
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
          
          <div className="table-container">
           <table id="companies">
            <tbody>
            <tr>
              <th>Produto</th>
              <th>Preco</th>
              <th>Descricao</th>
              <th>Data</th>
              <th>Empresa</th>
              <th>validade</th>
              <th>Desconto</th>
              <th>Imagem</th>
              <th className="noWrap">Comandos</th>
            </tr>

            {products.map(products => {
              if(products){
                return(
                    <tr key={products.id}>
                    <td>{products.name}</td>
                    <td>{products.price}</td>
                    <td>{products.description}</td>
                    <td>{products.date}</td>
                    <td>{products.company_id}</td>
                    <td>{products.validate}</td>
                    <td>{products.discount}</td>
                    <td>placeholder</td>
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