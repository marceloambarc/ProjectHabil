import React, { useState, useEffect } from 'react';

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
  images: Array<{
    id: number;
    url: string;
  }>;
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

  return(
    <div id="page-control-map">
      <Sidebar />
      <main>
        <div className="control-map">

          <h1>Novas Promoções Cadastradas</h1>
          
          <div className="row">
            
              {products.map(product => {
                return(
              <div key={product.id} className="column">
                <div className="card">
                  <h1 className="card-title">{product.name}</h1>
                  <p className="card-price">R$ {product.price}</p>
                  <p className="card-text">{product.description}</p>
                  <p><button className="cancel" onClick={() => handleDelete({product})}>Rejeitar</button> <button className="aprove">Aprovar</button></p>
                </div>
              </div>)
            })}

            </div>
        
        </div>
      </main>
    </div>
  );
}

export default Products;