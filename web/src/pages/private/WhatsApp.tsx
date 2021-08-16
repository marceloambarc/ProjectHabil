import React, { useState, useEffect } from 'react';
import { MdSend } from 'react-icons/md';

import Sidebar from '../../components/Sidebar';
import UpperBar from '../../components/UpperBar';
import '../../styles/pages/whatsapp.css';

import qrCodeImage from '../../images/qrcode.png';

import mailer from '../../services/api';

function WhatsApp(){
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');
  const [qrCodeImage, setQrCodeImage] = useState('');

  async function loadQrCode() {
    fetch(`http://192.168.15.35:3000/whatsgun`,{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        toSend: message,
      })
    }).then(res => {
      console.log(res);
    })
  }

  useEffect(() => {
    loadQrCode()
  },[]);

  return (
    <div id="page-control-map">
      <Sidebar role={role} />
      <main>
        <UpperBar role={role} />
        <div className="control-map">
          <div className="whatsapp-body">
          <h1 style={{fontSize:'22px'}}>Envio de Whatsapp.</h1>
          <h2 style={{fontSize:'20px', color:'#8fa7b3'}}>Aguarde o carregamento do QRcode.</h2>
          <h2 style={{fontSize:'20px', color:'#8fa7b3'}}>Escaneie com o Aplicativo do Whatsapp {">"} Aparelhos conectados. </h2>
          <h2 style={{fontSize:'20px', color:'#8fa7b3'}}>Escreva a Mensagem. </h2>
          <h2 style={{fontSize:'20px', color:'#8fa7b3'}}>Envie com o Botão Verde.</h2>
            <div className="qrcode-container">
              <img src={qrCodeImage} className="qrCodeImage" alt="qrCode" />
            </div>
            <div className="input-block">
              <label htmlFor="about">Mensagem:</label>
              <textarea
                rows={7}
                maxLength={300}
                value={message}
                onChange={event => setMessage(event.target.value)} 
              />
            </div>

            <div className="whatsapp-button-block">
              <button type="button" onClick={() => {}} className="shootWhatsappGun">
                <MdSend size="26" color="#fff" />
              </button>
            </div>
          </div>
        </div>

      </main>
    </div>
  )
}

export default WhatsApp;