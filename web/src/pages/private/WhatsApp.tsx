import React, { useState, useEffect } from 'react';
import { MdSend } from 'react-icons/md';

import Sidebar from '../../components/Sidebar';
import UpperBar from '../../components/UpperBar';
import '../../styles/pages/whatsapp.css';

import zaptest from '../../services/zaptest';

function WhatsApp(){
  const [isQrCodeLoaded, setIsQrCodeLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');
  const [qrCodeImage, setQrCodeImage] = useState('');
  const [qrCodeNotScanned, setQrCodeNotScanned] = useState(false);
  var [counter, setCounter] = useState(11);

  async function getQRCode() {
    setLoading(true);
    await zaptest.post(`/whatsgun`,{
      toSend: message
    }).then(res => {
      console.log(res.data.wbmResponse);
      setQrCodeImage(res.data.wbmResponse);
      setLoading(false);
      setIsQrCodeLoaded(true);
    }).catch(err => {
      console.log(err);
    });
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(counter--);
      if(counter === 0) {
        setQrCodeNotScanned(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  });

  if(loading) {
    return (
      <div id="page-control-map">
      <Sidebar role={role} />
      <main>
        <UpperBar role={role} />
        <div className="control-map">
          <div className="whatsapp-body">
          <p>CARREGANDO...</p>
          </div>
        </div>
      </main>
    </div>
    );
  } else if(qrCodeNotScanned) {
    return (
      <div id="page-control-map">
      <Sidebar role={role} />
      <main>
        <UpperBar role={role} />
        <div className="control-map">
          <div className="whatsapp-body">
          <p>NOT SCANNED</p>
          </div>
        </div>
      </main>
    </div>
    );
  } else if(!isQrCodeLoaded) {
    return (
    <div id="page-control-map">
      <Sidebar role={role} />
      <main>
        <UpperBar role={role} />
        <div className="control-map">
          <div className="whatsapp-body">
            <div className="qrcode-container">
              <h1 style={{fontSize:'22px'}}>Envio de Whatsapp.</h1>
              <h2 style={{fontSize:'20px', color:'#8fa7b3'}}>Escreva sua mensagem.</h2>
              <h2 style={{fontSize:'20px', color:'#8fa7b3'}}>Clique em Iniciar para Gerar QRCode </h2>
              <h2 style={{fontSize:'20px', color:'#8fa7b3'}}>Escaneie o Código com Whatsapp {">"} Aparelhos conectados. </h2>
              <h2 style={{fontSize:'20px', color:'#8fa7b3'}}>Aguarde até a Conclusão de envio.</h2>
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
              <button type="button" onClick={getQRCode} className="shootWhatsappGun">
                <MdSend size="26" color="#fff" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
    );
  }
  return (
    <div id="page-control-map">
      <Sidebar role={role} />
      <main>
        <UpperBar role={role} />
        <div className="control-map">
          <div className="whatsapp-body">
            <div className="qrcode-container">
              <img src={qrCodeImage} className="qrCodeImage" alt="qrCode" />
              <h2>Escaneio o Código com o Aplicativo Whatsapp.</h2>
              <p>{counter}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default WhatsApp;