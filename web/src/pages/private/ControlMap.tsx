import React from 'react';
import { FaExchangeAlt } from 'react-icons/fa'

import Sidebar from '../../components/Sidebar';
import '../../styles/pages/controlmap.css';
import '../../styles/pages/home.css';

import advImg1 from '../../images/content_id.png';
import advImg2 from '../../images/content_id.png';
import logoImg from '../../images/cmatextlogo.png';

function ControlMap(){

  async function handleChangeImage1() {
    alert('TODO Change Image1 on DATABASE using base64');
  }

  async function handleChangeImage2(){
    alert('TODO Change Image2 on DATABASE using base64');
  }


  return(
    <div id="page-control-map">
      <Sidebar />
      <main>
        <div className="control-map">

          <div className="text">
            <h1>Pagina Inicial</h1>
          </div>
            <h2 className="imagesText">Imagens renderizadas no aplicativo <img src={logoImg} className="landingImg" alt="CompreMaisAki" /></h2>
          <div className="advRow">
            <div className="advCol">
              <label>Imagem 1:</label>
              <img src={advImg1} className="AdvImage" alt="AdvImage" style={{width: "85%"}}/>
              
              <div className="button-block">
                <button type="button" onClick={() => handleChangeImage1()} className="changeImageButton">
                  <FaExchangeAlt size="26" color="#fff" />
                </button>
              </div>
            </div>
            <div className="advCol">
              <label>Imagem 2:</label>
              <img src={advImg2} className="AdvImage" alt="AdvImage" style={{width: "85%"}} />
              
              <div className="button-block">
                <button type="button" onClick={() => handleChangeImage2()} className="changeImageButton">
                  <FaExchangeAlt size="26" color="#fff" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default ControlMap;