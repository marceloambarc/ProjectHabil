import React, { useState } from 'react';
import { RiSearchLine } from 'react-icons/ri'

import { Company } from '../../libs/companyProps';
import api from '../../services/api';

import '../../styles/pages/client/promos.css';
import '../../styles/pages/card.css';

import logoCentral from '../../images/cmatextlogo.png';
import cardImage from '../../images/adaptive-icon.png';

//CLIENT SIDE - TODO
function Promos(){
  const [isSearched, setIsSearched] = useState(false);
  const [getError, setGetError] = useState(false);
  const [searchKeywords, setSearchKeywords] = useState('');
  const [companies, setCompanies] = useState<Company[]>([]);

  function handleSearch() {
    setGetError(false);
    api.get(`/companies/keywords/${searchKeywords}`).then(res => {
      setCompanies(res.data);
      console.log(res.data);
      setIsSearched(true);
    }).catch(err => {
      console.log(err);
      setGetError(true);
    });
  }

  function renderCards() {
    return (
      <div className="promos-row">
        {
          companies.map(company => {
            <div className="promos-col">

            <div className="card">
              <div className="card-body">
                <p><img className="card-image" src={'data:image/png;base64' + ',' + company.image} alt="Imagem da Empresa" /></p>
                <h4 className="card-title">{company.name}</h4>
                <p className="card-text">{company.business}</p>
                <a href="https://www.fiverr.com/share/qb8D02" className="card-button"><i className="fa fa-plus"></i></a>
              </div>
            </div>
  
          </div>
          })
        }
      </div>
    )
  }

  function renderPromos() {
    if(!isSearched) {
      return (
        <div className="promos-not-searched">
          <div className="promos-not-searched-row">
            <img className="not-searched-image" src={cardImage} />
            <h3>Digite na barra superior a sua Pesquisa.</h3>
          </div>
        </div>
      );
    } else if(getError) {
      return (
        <div className="promos-not-searched">
          <div className="promos-not-searched-row">
            <img className="not-searched-image" src={cardImage} />
            <h3>Nenhuma empresa Encontrada, Pesquise novamente.</h3>
          </div>
        </div>
      );
    } else {
      return (
        <div className="promos-area">
         {renderCards()}
        </div>
      );
    }
  }
  return(
    <div id="promos-control-map">
      <main>
        <div className="logoCentralContainer">
            <img src={logoCentral} className="promos-logo" alt="CompreMaisAkiAdaptive-Icon" />
          </div>
        <div className="promos-control-map">
  
          <div className="formContainer">
            <div className="header-row">
              <div className="promos-input-block">
                <label htmlFor="name">Pesquise:</label>
                <input 
                  type="text"
                  id="name" 
                  value={searchKeywords} 
                  onChange={e => setSearchKeywords(e.target.value)} />
                <button type="button" onClick={() => handleSearch()} className="promos-search">
                  <RiSearchLine className="pngWelcome" color="#fff" />
                </button>
              </div>
            </div>
  
            <div className="divider" >
              <hr style={{color: '#ebf2f5',height:'1px', borderColor: '#ebf2f5', borderWidth:1}}/>
            </div>
          </div>
          {renderPromos()}
        </div>
      </main>
    </div>
  );
}

export default Promos;