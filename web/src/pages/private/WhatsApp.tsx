import React, { useState, useEffect } from 'react';
import { MdSend } from 'react-icons/md';
import { BsArrowReturnLeft } from 'react-icons/bs';
import { useHistory } from 'react-router-dom'; 

import Sidebar from '../../components/Sidebar';
import UpperBar from '../../components/UpperBar';
import '../../styles/pages/whatsapp.css';

import zaptest from '../../services/zaptest';
import api from '../../services/api';
import { COLLECTIONS_CMA } from '../../services/storage';

function WhatsApp(){
  const getUserToken = localStorage.getItem('userToken');

  const [userToken] = useState(`${getUserToken}`);
  const [role, setRole] = useState('');
  const [isQrCodeLoaded, setIsQrCodeLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingQrCode, setLoadingQrCode] = useState(false);
  const [message, setMessage] = useState('');
  const [qrCodeImage, setQrCodeImage] = useState('');
  const [qrCodeNotScanned, setQrCodeNotScanned] = useState(false);
  var [counter, setCounter] = useState(30);

  const [qrCodeScanned, setQrCodeScanned] = useState(false);
  const [qt, setQt] = useState(0);

  const history = useHistory();

  async function getRoles(){
    api.get('admin/tk',{
      headers: {'Authorization': 'Bearer '+userToken}
    }).then(res => {
      setRole(res.data.role);
    }).catch(() => {
      history.push("/app");
    });
  }

  useEffect(() => {
    if(!loading) {
      return;
    } else {
      getRoles();
      //Finalizar Carregamento
      setLoading(false);
    }
  }, []);

  async function handleReturn() {
    setLoadingQrCode(false);
    setIsQrCodeLoaded(false);
    setQrCodeNotScanned(false);
  }

  async function startWhatsapp() {
    localStorage.removeItem(`${COLLECTIONS_CMA}`);
    setLoadingQrCode(true);
    await zaptest.get(`/whatsgun`).then(async res => {
      setQrCodeImage(res.data.wbmResponse);
      startCounter();
      setLoadingQrCode(false);
      setIsQrCodeLoaded(true);
      await zaptest.post('/whatsgun',{
        toSend: message
      }).then( async res => {
        const date = new Date();
        localStorage.setItem(`${COLLECTIONS_CMA}`, (date).toString());

        setQt(res.data);
        setQrCodeScanned(true);
        setLoadingQrCode(false);
        setIsQrCodeLoaded(false);
        setLoadingQrCode(false);
      }).catch(err => {
        console.log({'Erro 1': err});
      });
    });
  }

  async function getQRCode() {
    if(message === ''){
      alert('A mensagem não pode ser vazia.');
      return;
    }
    const storageDate = localStorage.getItem('wwapp-cmacdlv1storage-vnewdt-10k10l19j2999');

    if(storageDate != null) {
      var OneDayProto = new Date(storageDate).getTime() + (1 * 24 * 60 * 60 * 1000);
      const OneDay = new Date(OneDayProto);

      const today = new Date();
      if(today >= OneDay) {
        startWhatsapp();
      } else {
        alert(`Você já utilizou a função Whatsapp Hoje, aguarde até amanhã.`);
        console.log(OneDay, today);
      }
    } else {
      startWhatsapp();
    }
  }

  function startCounter() {
    const interval = setInterval(() => {
      setCounter(counter--);
      if(counter === -1) {
        setQrCodeNotScanned(true);
          clearInterval(interval);
          setCounter(30);
      }
    }, 1000);
  }

  if(qrCodeScanned) {
      return (
        <div id="page-control-map">
        <Sidebar role={role} />
        <main>
          <UpperBar role={role} />
          <div className="control-map">
            <div className="whatsapp-body">
              <div className="qrcode-container">
              <h1 style={{fontSize:'22px'}}>Ok!</h1>
              <h2 style={{fontSize:'20px', color:'#8fa7b3'}}>As mensagens estão sendo encaminhadas.</h2>
              <h2 style={{fontSize:'20px', color:'#017895'}}>total de números: {qt}</h2>
              <br></br>
              <h2 style={{fontSize:'20px', color:'#8fa7b3'}}>Você pode utilizar o Whatsapp normalmente.</h2>
              <h2 style={{marginBottom: '60px', fontSize:'20px', color:'#8fa7b3'}}>O disparador interrompe automaticamente o processo.</h2>
              </div>
            </div>
          </div>
        </main>
      </div>
      );
  } else if(loadingQrCode) {
    return (
      <div id="page-control-map">
      <Sidebar role={role} />
      <main>
        <UpperBar role={role} />
          <div className="loading-container">
            <p>Aguarde...</p>
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
          <div className="qrcode-container">
            <p>Código não Escaneado.</p>
            <div className="whatsapp-button-block">
            <label htmlFor="about">Tente Novamente</label>
              <button type="button" onClick={handleReturn} className="shootWhatsappGun">
                <BsArrowReturnLeft size="26" color="#fff" />
              </button>
            </div>
          </div>
          </div>
        </div>
      </main>
    </div>
    );
  } else if(isQrCodeLoaded) {
    return (
      <div id="page-control-map">
        <Sidebar role={role} />
        <main>
          <UpperBar role={role} />
          <div className="control-map">
            <div className="whatsapp-body">
              <div className="qrcode-container">
                <img src={qrCodeImage} className="qrCodeImage" alt="qrCode" />
                <h2>Escaneie o Código com o Aplicativo Whatsapp.</h2>
                <p style={{marginBottom: '60px'}}>{counter}</p>
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
              <h1 style={{fontSize:'22px'}}>Envio de Whatsapp.</h1>
              <br></br>
              <h2 style={{fontSize:'18px', color:'#8fa7b3'}}>Clique em Iniciar para Gerar QRCode </h2>
              <h2 style={{fontSize:'18px', color:'#8fa7b3'}}>Escaneie o Código com Whatsapp {">"} Aparelhos conectados. </h2>
              <h2 style={{fontSize:'18px', color:'#8fa7b3'}}>Aguarde até a Conclusão de envio.</h2>
              <br></br>
              <h2 style={{fontSize:'20px', color:'#017895'}}>Para segurança da Aplicação, está restrito apenas 1(uma) utilização desta função por dia.</h2>
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
            <label htmlFor="about">OBS: Máximo 30 segundos para Escanear.</label>
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

export default WhatsApp;