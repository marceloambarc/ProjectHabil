import React, {  useState } from 'react';
import { FiSend } from 'react-icons/fi'
import api from '../services/api';

import '../styles/pages/confirm.css';

import logoImg from '../images/cmatextlogo.png';
import tokenCredentials from '../services/token.json';

//---CRIAR USEEFFECT PARA RETURN(<P>LOADING...<P>);
function Landing(props:any) {
  const [company, setCompany] = useState('');
  const [password, setPassword] = useState('');

  const tokenUsername = tokenCredentials.username;
  const tokenPassword = tokenCredentials.password;
  const tokenGrantType = tokenCredentials.grant_type;

  //CORRIGIR MODELO PARA REACT-ROUTER-DOM
  async function handleConfirm(){
    const params = new URLSearchParams();
    params.append('username', tokenUsername)
    params.append('password', tokenPassword)
    params.append('grant_type', tokenGrantType)

    const response = await api.post('token',params);
    const userToken = response.data.access_token;

    if(company == '' || company == ' ' || company == undefined){
      alert('CNPJ INVÁLIDO');
      return;
    }

    if(password == '' || password == ' ' || password == undefined){
      alert('SENHA INVÁLIDA');
      return;
    }
    
      api.post('companies/logon/inativo',{
        cnpj: company,
        password: password
      },{
        headers: {'Authorization': 'Bearer '+userToken} 
      }).then(() => {
        api.put(`companies/${props.match.params.id}`,{
          is_active: 1
        },{
          headers: {'Authorization': 'Bearer '+userToken}
        }).then(() => {
          alert("Sucesso! Aguarde a confirmacão do Administrador para acessar o Aplicativo e cadastrar suas promoções");
          window.location.href = '/';
        }).catch(err => {
          alert("Ops! Tivemos um Erro de Servidor, entre em contato com o Suporte.");
          return;
        })
      }).catch(err => {
        alert("Ops! Tivemos um Erro de Servidor, entre em Contato com o Suporte.");
        return;
      })
      
      
  }

  return (
    <div id="confirm-container">
      <div className="content-wrapper">

        <main>
          <h1>Confirme seu Email</h1>
          <p><img src={logoImg} className="landingImg" alt="CompreMaisAki" /></p>

          <div className="input-block">
            <label htmlFor="about">CNPJ:</label>
            <input 
              id="company" 
              maxLength={300}
              value={company}
              onChange={event => setCompany(event.target.value)} />
          </div>

          <div className="input-block">
            <label htmlFor="name">Senha:</label>
            <input 
              //type="password"
              id="name" 
              value={password} 
              onChange={event => setPassword(event.target.value)} /> 
          </div>

          <button type="button" onClick={() => handleConfirm()} className="confirm-app">
            <FiSend size="26" color="#fff" />
          </button>

        </main>
      </div>
    </div>
  ); 
}

export default Landing;