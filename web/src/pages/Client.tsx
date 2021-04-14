import React, { useState } from 'react';
import { FiDollarSign, FiLayers, FiBookOpen, FiArrowDownCircle, FiSearch } from 'react-icons/fi';
import { IoCloseCircleOutline } from 'react-icons/io5';

import api from '../services/api';

import '../styles/pages/client.css';
import '../styles/pages/card.css';
import '../styles/pages/card-columns.css';

import logoCentral from '../images/adaptive-icon.png';

interface Companies {
  id: number,
  business: string,
  name: string,
  phone: string,
  email: string,
  address: string,
  images: string,
  companie: any,
}

//CLIENT SIDE - TODO
function Client(){
  const [companies, setCompanies] = useState<Companies[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  async function handleSearch(){
    api.get('companies').then(response => {
      setCompanies(response.data);
    });
  }

  async function handleViewPerPrice(){
    alert('Price');
  }

  async function handleViewPerDesc(){
    alert('DESC');
  }

  async function handleViewInactive(){
    alert('Tester');
  }

  async function handleCloseApp(){
      try{
        window.location.href = '/';
      }catch(err){
          alert('Tivemos um erro');
      }
  }

  return(
    <div id="client-control-map">
        <div className="close-button-container">
        <button onClick={() => handleCloseApp()} id="button">
            <IoCloseCircleOutline size="26" />
        </button>
        </div>
      <main>
        <div className="client-control-map">

          <div className="logoCentralContainer">
              <img src={logoCentral} className="logoCentral" alt="CompreMaisAkiAdaptive-Icon" />
              <div className="searchBar">
                <input type="text" value={searchTerm} onChange={event => setSearchTerm(event.target.value)} placeholder="Procurar..." />
                <button onClick={() => handleSearch()}>
                    <FiSearch size="26" />
                </button>
              </div>
          </div>

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
          
          <div className="row">
            
              {companies.map(companie => {
               
                    return(
                     
                        <div key={companie.id} className="column">
                            <div className="card">
                            <h1 className="card-title">{companie.name}</h1>
                            <p className="card-price">R$ {companie.business}</p>
                            <p className="card-text">{companie.email}</p>
                            <p> <button className="aprove" onClick={() => window.location.href = `/companie/:${companie.id}`}>Acessar</button></p>
                            </div>
                        </div>)
                
            })}

            </div>
        
        </div>
      </main>
    </div>
  );
}

export default Client;