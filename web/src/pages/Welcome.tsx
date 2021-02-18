import React, { useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { GrUserAdmin } from 'react-icons/gr';

import logoImg from '../images/cmatextlogo.png';

import '../styles/pages/welcome.css';

import qrcode from '../images/qrcode.png';
import applestore from '../images/appstore.png';
import googleplay from '../images/googleplay.png';
import smartphone from '../images/smartphone.png';

function Welcome() {

  async function handleLogin(){
    try {
      window.location.href = '/login';
    }catch(err){
      console.log(err);
    }
  }

  async function handleClient(){
    try {
      window.location.href = '/client';
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div id="page-welcome">
      <div className="welcome-wrapper">

        <main>
          <img src={logoImg} className="landingImg1" alt="CompreMaisAki" />
          <h1>Bem-Vindo</h1>
          <p>o app que leva</p>
          <p>Nova Santa Rita</p>
          <p>sempre com você.</p>

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
            <p className="enter-text">Entrar</p>
            <button type="button" onClick={() => handleClient()} className="enter-app">
              <FiArrowRight size="26" color="#FFF" />
            </button>
          </div>
          <div className="enter-app-col2">
            <button type="button" onClick={() => handleLogin()} className="enter-app">
              <GrUserAdmin size="26" color="#fff" />
            </button>
          </div>
        </div>
      </div>
    </div>
  ); 
}

export default Welcome;