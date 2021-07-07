import React, { useState, createRef } from 'react';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import Modal from 'react-modal';
import Resizer from "react-image-file-resizer";

import api from '../services/api';
import tokenCredentials from '../services/token.json';

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

const loadingImg = 'https://via.placeholder.com/400x200';

//CLIENT SIDE - TODO
function Client(){
  const [isLoading, setIsLoading] = useState(true);
  const [tokenVariable, setUserToken] = useState('');
  const [name, setName] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [business, setBusiness] = useState('');
  const [telephone, setTelephone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [complement, setComplement] = useState('');
  const [district, setDistrict] = useState('');
  const [city] = useState('Nova Santa Rita');
  const [uf] = useState('RS');
  const [keywords, setKeywords] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const fileInput1 = createRef<any>();
  const [isLoadingImage1, setIsLoadingImage1] = useState(false);
  const [isImage1Loaded, setIsImage1Loaded] = useState(true);
  const [img1, setImg1] = useState('');
  const [base] = useState('data:image/jpeg;base64');

  const [modalIsOpen, setIsOpen] = useState(false);
  const [showPassword, setShowPassword] = useState('password');
  const [showConfirmPassword, setShowConfirmPassword] = useState('password');
  const [isChecked, setIsChecked] = useState(false);

  const tokenGrantType = tokenCredentials.grant_type;
  const username = tokenCredentials.username;
  const tokenPassword = tokenCredentials.password;

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

    //---REFATORAR CÓDIGOS--- "i++""
    function renderImg1(){
      if(isLoading){
        return (
          <div style={{height: 200, width: 400, marginLeft: 40}}>
            <img src={loadingImg} className="image" alt="AdvImage" style={{width: "85%"}}/>
          </div>
          
        );
      }else{
        return(
          <div style={{height: 200, width: 400, marginLeft: 40}}>
            <img src={base + ',' + img1} className="image" alt="AdvImage" style={{width: "85%"}}/>
          </div>
        );
      }
    }

  const resizeFile = (file:any) =>
    new Promise((resolve:any) => {
      Resizer.imageFileResizer(
        file,
        150,
        150,
        "PNG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64",
        150,
        150,
      );
    });

    //TAKE THE FILEINPUT
    async function handleChangeImage1(e:any) {
      e.preventDefault();
      const file = fileInput1.current?.files[0];
      setIsLoadingImage1(true);
      const image = await resizeFile(file);
      const fileAdaptedRender = String(image).split(',').pop();
      setImg1(fileAdaptedRender? fileAdaptedRender: '');
  
      setIsLoadingImage1(false);
      setIsLoading(false);
      setIsImage1Loaded(false);
    }

  async function handleFinish(){
    const params = new URLSearchParams();
    params.append('username', username)
    params.append('password', tokenPassword)
    params.append('grant_type', tokenGrantType)

    const response = await api.post('token',params);
    const userToken = response.data.access_token;
    setUserToken(tokenVariable);

    if(userToken != ''){
      const finalAddress = address.concat("/", complement);
      api.post('companies/cnpj',{
        headers: {'Authorization': 'Bearer '+userToken}
      }).then(res => {
        alert('Erro, Empresa já Cadastrada');
      }).catch(err => {
        api.post('companies',{
          name,
          cnpj,
          business,
          phone: telephone,
          email: email.toLocaleLowerCase(),
          address: finalAddress,
          district,
          city,
          uf,
          keywords,
          image: img1,
          password,
        },{
          headers: {'Authorization': 'Bearer '+userToken}
        }).then(res => {
          setBusiness('');
          setCnpj('');
          setName('');
          setTelephone('');
          setEmail('');
          setAddress('');
          setDistrict('');
          setPassword('');
          setKeywords('');
          alert('Empresa Cadastrada! Aguarde a Confirmação do Administrador e acesse pelo seu Aplicativo!');
          window.location.href = '/';
        }).catch(err => {
          alert('Erro, Verifique sua conexão.');
        });
      })
    }else{
      alert('Não foi possível gerar credenciais, verifique sua conexão.');
    }
  }

  async function handleCreate(){
    if(isChecked){
      if(name != "" && name != undefined){
        if(name.length < 3){
          alert('Nome muito curto.');
        }else{
          if(cnpj.length != 14){
            alert('CNPJ Inválido');
          }
          else{
            if(business != "" && business != undefined){
              if(business.length < 3){
                alert('Ramo muito curto.');
              }else{
                if(telephone.length != 13){
                  alert('Número Inválido')
                }else{
                  if(email != "" && email != undefined){
                    if(email.length < 6){
                      alert('Email Inválido.');
                    }else{
                      if(address != "" && address != undefined){
                        if(address.length <= 3){
                          alert('Endereço Inválido')
                        }else{
                          if(complement != undefined){
                            setComplement('');
                          }
                          if(district != "" && district != undefined){
                            if(district.length < 3){
                              alert('Bairro muito curto.');
                            }else{
                              if(keywords != "" && keywords != undefined){
                                if(keywords.length < 3){
                                  alert('Palavra chave inválida, palavra muito curta.')
                                }else{
                                  if(password != "" && password != undefined){
                                    if(password.length <= 3){
                                      alert('Senha Muito Curta');
                                    }else{
                                      if(confirmPassword != "" && confirmPassword != undefined){
                                        if(confirmPassword.length <= 3){
                                          alert('Confirmação de Senha Muito Curta');
                                        }else{
                                          if(password != confirmPassword){
                                            alert('Senhas não Conferem');
                                          }else{
                                            handleFinish();
                                          }
                                        }
                                      }else{
                                        alert('Confirme Sua senha');
                                      }
                                    }
                                  }else{
                                    alert('Insira sua Senha');
                                  }
                                }
                              }else{
                                alert('Insira suas Palavras chaves, separados por vírgulas.');
                              }
                            }
                          }else{
                            alert('Por Favor, Insira seu Bairro.');
                          }
                        }
                      }else{
                        alert('Insira seu Endereço');
                      }
                    }
                  }else{  
                    alert('Email Inválido.');
                  }
                }
              }
            }else{
              alert('Por favor, Insira o Ramo Empresarial');
            }
          }
        }
      }else{
        alert('Por favor, Insira o Nome Fantasia');
      }
    }else{
      alert('Você deve aceitar os Termos de Uso');
    }
    
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
        <div id="closeContainer">
          <button onClick={() => handleCloseApp()} id="closeAppButon">
            <IoCloseCircleOutline size={24} color="white" />
          </button>
        </div>
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
                  maxLength={30}
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
                  maxLength={14}
                  value={cnpj}
                  onChange={event => setCnpj(event.target.value)}
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
                  className="textInput"
                />
              </div>
              <div className="input-block">
                <label htmlFor="uf">UF:</label>
                <input 
                  id="user" 
                  maxLength={300}
                  value={uf}
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
                      <FiEye size="24" color="#017895" />
                    </button>
                    
                    :
                    <button 
                      onClick={() => setShowPassword('password')}
                      className="showPasswordButton"
                    >
                      <FiEyeOff size="24" color="#017895" />
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
                      <FiEye size="24" color="#017895" />
                    </button>
                    :
                    <button
                    onClick={() => setShowConfirmPassword('password')}
                    className="showPasswordButton"
                  >
                    <FiEyeOff size="24" color="#017895" />
                  </button>
                  }
                </div>
              </div>
            </div>

            <div className="formImage">
              <div className="photo-button-container">
                

              <label>Imagem 1:</label>
              {renderImg1()}
              
              <div className="button-block">
                <div className="image-handle">
                  <input type='file' name='file' ref={fileInput1} className='changeImageButton' onChange={e => handleChangeImage1(e)} />
                </div>
              </div>


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