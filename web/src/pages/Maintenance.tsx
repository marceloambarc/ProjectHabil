import * as React from 'react';
import logoImg from '../images/cmatextlogo.png';

import '../styles/pages/maintenance.css';


//---TELA INICIAL // BOTAO CLIENT INATIVO PARA HOMOLOGACAO
function Maintenance() {
  return (
    <div id="page-welcome">
      <div className="welcome-wrapper">

        <main>

          <h1>Estamos em Manutenção!</h1>
          <h2>Mas o aplicativo está funcionando!</h2>
          <h2>Verifique as novidades no Aplicativo</h2>
          <a href="https://play.google.com/store/apps/details?id=com.habil.nsr">
            <img src={logoImg} className="landingImg1" alt="CompreMaisAki" />
          </a>

        </main>

      </div>
    </div>
  ); 
}

export default Maintenance;