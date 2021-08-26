import * as React from 'react';
import { GrUserAdmin } from 'react-icons/gr';
import { FiArrowRight } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';

import logoImg from '../images/cmatextlogo.png';

import '../styles/pages/welcome.css';

import qrcode from '../images/qrcodegoogleplay.jpeg';
import applestore from '../images/appstore.png';
import googleplay from '../images/googleplay.png';
import smartphone from '../images/smartphone.png';


//---TELA INICIAL // BOTAO CLIENT INATIVO PARA HOMOLOGACAO
function Welcome() {
  return (
    <div id="page-welcome">
      <div className="welcome-wrapper">

        <main>
          <img src={logoImg} className="landingImg1" alt="CompreMaisAki" />
          <div className="welcome-text">
            <h1>Bem-Vindo</h1>
            <p>o app que leva</p>
            <p>Nova Santa Rita</p>
            <p>sempre com você.</p>
          </div>
          <div className="welcome-block">

            <div className="welcome-block-col">
              <img src={qrcode} className="qrcodeLogo" alt="qrcodeCompreMaisAki" />
            </div>
            <div className="welcome-block-col">
              <div className="welcome-block-col">
                <img src={applestore} className="appstoreLogo" alt="appstoreCompreMaisAki" />
              </div>
              <div className="welcome-block-col">
                <img src={googleplay} className="googleplayLogo" alt="googleplayCompreMaisAki" />
              </div>
            </div>
          </div>          

        </main>

        <div className="location">
          <img src={smartphone} className="smartphone" alt="smartphoneCompreMaisAki" />
        </div>

        <div className="enter-app-container">
          
          <div className="enter-app-col1">
            <NavLink to="/client" className="register-app">
              <p className="enter-text">Cadastrar sua Empresa</p>
            </NavLink>
          </div>
          <div className="enter-app-col2">
            <NavLink to="/login" className="enter-app">
              <GrUserAdmin className="pngEnter" color="#fff" />
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  ); 
}

export default Welcome;