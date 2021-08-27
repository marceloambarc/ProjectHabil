import React, { useState } from 'react';
import { RiSearchLine } from 'react-icons/ri'

import '../../styles/pages/client/promos.css';
import '../../styles/pages/card.css';

import logoCentral from '../../images/cmatextlogo.png';
import cardImage from '../../images/adaptive-icon.png';

//CLIENT SIDE - TODO
function Promos(){
  const [isSearched, setIsSearched] = useState(false);

  function renderPromos() {
    if(!isSearched) {
      return (
        <div className="promos-not-searched">
          <p>Not Searched</p>
        </div>
      );
    }else{
      return (
        <div className="promos-area">
          <div className="promos-row">
            <div className="promos-col">

              <div className="card">
                <div className="card-body">
                  <p><img className="card-image" src={cardImage} /></p>
                  <h4 className="card-title">Hello</h4>
                  <p className="card-text">This is basic card with image on top, title, descripton and button</p>
                  <a href="https://www.fiverr.com/share/qb8D02" className="card-button"><i className="fa fa-plus"></i></a>
                </div>
              </div>

            </div>
            <div className="promos-col">
              
              <div className="card">
                <div className="card-body">
                  <p><img className="card-image" src={cardImage} /></p>
                  <h4 className="card-title">Hello</h4>
                  <p className="card-text">This is basic card with image on top, title, descripton and button</p>
                  <a href="https://www.fiverr.com/share/qb8D02" className="card-button"><i className="fa fa-plus"></i></a>
                </div>
              </div>

            </div>
            <div className="promos-col">
              
              <div className="card">
                <div className="card-body">
                  <p><img className="card-image" src={cardImage} /></p>
                  <h4 className="card-title">Hello</h4>
                  <p className="card-text">This is basic card with image on top, title, descripton and button</p>
                  <a href="https://www.fiverr.com/share/qb8D02" className="card-button"><i className="fa fa-plus"></i></a>
                </div>
              </div>


            </div>
          </div>
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
                  value={'hello'} 
                  onChange={() => {}} />
                <button type="button" onClick={() => setIsSearched(true)} className="promos-search">
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