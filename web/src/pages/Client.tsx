import React, { useState } from 'react';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import Modal from 'react-modal';

import api from '../services/api';

import '../styles/pages/client.css';
import '../styles/pages/card.css';
import '../styles/pages/card-columns.css';

import logoCentral from '../images/adaptive-icon.png';
import Privacy from './Privacy';

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

  const [modalIsOpen, setIsOpen] = useState(false);
  const [showPassword, setShowPassword] = useState('password');
  const [showConfirmPassword, setShowConfirmPassword] = useState('password');
  const [isChecked, setIsChecked] = useState(false);

  function closeModal(){
    setIsOpen(false);
  }

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

  async function handleCheckbox(){
    if(isChecked == true){
      setIsChecked(false);
    }else{
      setIsChecked(true);
    }
  }

  return(
    <div id="client-control-map">
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
                  className="textInput"
                  placeholder="Sua Empresa"
                />
              </div>
              <div className="input-block">
                <label htmlFor="cnpj">CNPJ:</label>
                <input 
                  id="user" 
                  maxLength={300}
                  value={cnpj}
                  onChange={event => setCnpj(event.target.value)}
                  type="number"
                  className="textInput"
                  placeholder="Seu CNPJ"
                />
              </div>
              <div className="input-block">
                <label htmlFor="ramo">Ramo:</label>
                <input 
                  id="user" 
                  maxLength={300}
                  value={business}
                  onChange={event => setBusiness(event.target.value)}
                  className="textInput"
                  placeholder="Ramo Empresarial"
                />
              </div>
              <div className="input-block">
                <label htmlFor="telefone">Telefone/Whatsapp:</label>
                <input 
                  id="user" 
                  maxLength={300}
                  value={telephone}
                  onChange={event => setTelephone(event.target.value)}
                  type="tel"
                  className="textInput"
                  placeholder="(51)xxxxxxxxx"
                />
              </div>
              <div className="input-block">
                <label htmlFor="email">Email:</label>
                <input 
                  id="user" 
                  maxLength={300}
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                  type="email"
                  className="textInput"
                  placeholder="email@mail.com"
                />
              </div>
              <div className="input-block">
                <label htmlFor="endereço">Endereço:</label>
                <input 
                  id="user" 
                  maxLength={300}
                  value={address}
                  onChange={event => setAddress(event.target.value)}
                  className="textInput"
                  placeholder="Seu Endereço"
                />
              </div>
              <div className="input-block">
                <label htmlFor="complemento">Complemento:</label>
                <input 
                  id="user" 
                  maxLength={300}
                  value={complement}
                  onChange={event => setComplement(event.target.value)}
                  className="textInput"
                  placeholder="Seu Complemento"
                />
              </div>
              <div className="input-block">
                <label htmlFor="bairro">Bairro:</label>
                <input 
                  id="user" 
                  maxLength={300}
                  value={district}
                  onChange={event => setDistrict(event.target.value)} 
                  className="textInput"
                  placeholder="Seu Bairro"
                />
              </div>
              <div className="input-block">
                <label htmlFor="cidade">Cidade:</label>
                <input 
                  id="user" 
                  maxLength={300}
                  value={city}
                  onChange={event => setCity(event.target.value)}
                  className="textInput"
                />
              </div>
              <div className="input-block">
                <label htmlFor="uf">UF:</label>
                <input 
                  id="user" 
                  maxLength={300}
                  value={uf}
                  onChange={event => setUf(event.target.value)}
                  className="textInput"
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
                  className="textInput"
                  placeholder="loja, roupas, escritório..."
                />
              </div>
            </div>
            <div className="formPassword">
              <div className="formPasswordRow">
                <div className="password-input">
                  <div className="input-block">
                    <label htmlFor="about">Senha:</label>
                    <input 
                      id="user" 
                      maxLength={300}
                      value={password}
                      onChange={event => setPassword(event.target.value)}
                      type={`${showPassword}`}
                      className="textInput"
                      placeholder="Insira sua Senha"
                    />
                  </div>
                </div>
                <div className="showPasswordContainer">
                  {
                    showPassword == 'password'?
                    <button 
                      onClick={() => setShowPassword('text')}
                      className="showPasswordButton"
                    >
                      <FiEye size="24" color="green" />
                    </button>
                    
                    :
                    <button 
                      onClick={() => setShowPassword('password')}
                      className="showPasswordButton"
                    >
                      <FiEyeOff size="24" color="green" />
                    </button>
                    
                  }
                </div>
              </div>
              <div className="formPasswordRow">
              <div className="password-input">
                  <div className="input-block">
                    <label htmlFor="about">Confirme Senha:</label>
                    <input 
                      id="user" 
                      maxLength={300}
                      value={confirmPassword}
                      onChange={event => setConfirmPassword(event.target.value)}
                      type={`${showConfirmPassword}`}
                      className="textInput"
                      placeholder="Confirme sua Senha"
                    />
                  </div>
                </div>
                <div className="showPasswordContainer">
                  {
                    showConfirmPassword === 'password'?
                    <button 
                      onClick={() => setShowConfirmPassword('text')}
                      className="showPasswordButton"
                    >
                      <FiEye size="24" color="green" />
                    </button>
                    :
                    <button
                    onClick={() => setShowConfirmPassword('password')}
                    className="showPasswordButton"
                  >
                    <FiEyeOff size="24" color="green" />
                  </button>
                  }
                </div>
              </div>
            </div>

            <div className="formImage">
              <div className="photo-button-container">
                <button onClick={() => handleSelectImage()} id="form-button" className="photo-button">
                    <p>Selecione Foto</p>
                </button>
              </div>
            </div>

            <div className="formTerm">
                <input 
                  type="checkbox"
                  className="checkbox"
                  checked={isChecked}
                  onClick={() => handleCheckbox()}
                />
                <p className="p-term">
                Concordo com os 
                <button className="term-button" onClick={() => setIsOpen(true)}>
                Termos de Uso
                </button>
              </p>
            </div>

            <div className="formSend">
              <div className="close-button-container">
                <button onClick={() => handleCreate()} id="form-button">
                    <p>Cadastrar</p>
                </button>
              </div>
            </div>
          </div>

        </div>
      </main>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="Modal"
        contentLabel="Example Modal"
        overlayClassName="Overlay"
      >
        <Privacy />
      </Modal>
    </div>
  );
}

export default Client;