import React, { useState } from 'react';
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
  const [name, setName] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [business, setBusiness] = useState('');
  const [telephone, setTelephone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [complement, setComplement] = useState('');
  const [district, setDistrict] = useState('');
  const [city, setCity] = useState('Nova Santa Rita');
  const [uf, setUf] = useState('RS');
  const [keywords, setKeywords] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  async function handleCloseApp(){
      try{
        window.location.href = '/';
      }catch(err){
          alert('Tivemos um erro');
      }
  }

  async function handleSelectImage(){
    alert('Selecione a Imagem.');
  }

  async function handleCreate(){
    alert('Concluído');
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
          </div>

          <div className="formContainer">
            <div className="formInput">
              <div className="input-block">
                <label htmlFor="name">Nome Fantasia:</label>
                <input 
                  id="user" 
                  maxLength={300}
                  value={name}
                  onChange={event => setName(event.target.value)} 
                />
              </div>
              <div className="input-block">
                <label htmlFor="cnpj">CNPJ:</label>
                <input 
                  id="user" 
                  maxLength={300}
                  value={cnpj}
                  onChange={event => setCnpj(event.target.value)} 
                />
              </div>
              <div className="input-block">
                <label htmlFor="ramo">Ramo:</label>
                <input 
                  id="user" 
                  maxLength={300}
                  value={business}
                  onChange={event => setBusiness(event.target.value)} 
                />
              </div>
              <div className="input-block">
                <label htmlFor="telefone">Telefone/Whatsapp:</label>
                <input 
                  id="user" 
                  maxLength={300}
                  value={telephone}
                  onChange={event => setTelephone(event.target.value)} 
                />
              </div>
              <div className="input-block">
                <label htmlFor="email">Email:</label>
                <input 
                  id="user" 
                  maxLength={300}
                  value={email}
                  onChange={event => setEmail(event.target.value)} 
                />
              </div>
              <div className="input-block">
                <label htmlFor="endereço">Endereço:</label>
                <input 
                  id="user" 
                  maxLength={300}
                  value={address}
                  onChange={event => setAddress(event.target.value)} 
                />
              </div>
              <div className="input-block">
                <label htmlFor="complemento">Complemento:</label>
                <input 
                  id="user" 
                  maxLength={300}
                  value={complement}
                  onChange={event => setComplement(event.target.value)} 
                />
              </div>
              <div className="input-block">
                <label htmlFor="bairro">Bairro:</label>
                <input 
                  id="user" 
                  maxLength={300}
                  value={district}
                  onChange={event => setDistrict(event.target.value)} 
                />
              </div>
              <div className="input-block">
                <label htmlFor="cidade">Cidade:</label>
                <input 
                  id="user" 
                  maxLength={300}
                  value={city}
                />
              </div>
              <div className="input-block">
                <label htmlFor="uf">UF:</label>
                <input 
                  id="user" 
                  maxLength={300}
                  value={uf}
                />
              </div>
            </div>
          
            <div className="formKeywords">
              <div className="input-block">
                <label htmlFor="about">Insira as palavras-chaves separadas por vírgula:</label>
                <input 
                  id="user" 
                  maxLength={300}
                  value={keywords}
                  onChange={event => setKeywords(event.target.value)} 
                />
              </div>
            </div>
            <div className="formPassword">
              <div className="input-block">
                <label htmlFor="about">Senha:</label>
                <input 
                  id="user" 
                  maxLength={300}
                  value={password}
                  onChange={event => setPassword(event.target.value)} 
                />
              </div>
              <div className="input-block">
                <label htmlFor="about">Confirme Senha:</label>
                <input 
                  id="user" 
                  maxLength={300}
                  value={confirmPassword}
                  onChange={event => setConfirmPassword(event.target.value)} 
                />
              </div>
            </div>

            <div className="formImage">
              <div className="close-button-container">
                <button onClick={() => handleSelectImage()} id="button">
                    <p>Selecione Foto</p>
                </button>
              </div>
            </div>

            <div className="formTerm">
              Concordo com os <a href="/">termos de Uso</a>
            </div>

            <div className="formSend">
              <div className="close-button-container">
                <button onClick={() => handleCreate()} id="button">
                    <p>Cadastrar</p>
                </button>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default Client;