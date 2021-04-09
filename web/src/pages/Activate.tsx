import React, {  useState } from 'react';
import { FiArrowRight } from 'react-icons/fi'
import api from '../services/api';

import logoImg from '../images/cmatextlogo.png';

import '../styles/pages/landing.css';
import tokenCredentials from '../services/token.json';


function Landing(props:any) {
  const [company, setCompany] = useState('');
  const [password, setPassword] = useState('');

  const tokenUsername = tokenCredentials.username;
  const tokenPassword = tokenCredentials.password;
  const tokenGrantType = tokenCredentials.grant_type;

  async function handleConfirm(){
    const params = new URLSearchParams();
    params.append('username', tokenUsername)
    params.append('password', tokenPassword)
    params.append('grant_type', tokenGrantType)

    const response = await api.post('token',params);
    const userToken = response.data.access_token;
    console.log(userToken);
    
      api.post('companies/logon',{
        cnpj:company,
        pasword: password,
      },{
        headers: {'Authorization': 'Bearer '+userToken}
      }).then(() => {
        alert("sucesso")
      }).catch(err => {
        alert(err);
      })
      
      
  }

  return (
    <div id="page-landing">
      <div className="content-wrapper">

        <main>
          <h1>Confirme seu</h1>
          <h1>E-mail</h1>
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

        </main>

        <div className="location">
          <strong>Nova Santa Rita</strong>
          <span>Rio Grande do Sul</span>
        </div>

        <button type="button" onClick={() => handleConfirm()} className="enter-app">
          <FiArrowRight size="26" color="#fff" />
        </button>
      </div>
    </div>
  ); 
}

export default Landing;