import React, { useState, useEffect } from 'react';

import Sidebar from '../../components/Sidebar'
import api from '../../services/api';

import '../../styles/pages/controlmap.css';

interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
  date: string;
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

  return(
    <div id="page-control-map">
      <Sidebar />
      <main>
        <div className="control-map">

          {products.map(product => { return(
            <h1>{product.name}</h1>
          ) })}
          

        </div>
      </main>
    </div>
  );
}

export default Products;