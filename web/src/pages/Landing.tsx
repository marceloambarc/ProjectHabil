import React, { useState } from 'react';
import { FiArrowRight } from 'react-icons/fi'
import api from '../services/api';

import logoImg from '../images/cmatextlogo.png';

import '../styles/pages/landing.css';
import tokenCredentials from '../services/token.json';

function Landing() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  async function handleAccess(){
    const params = new URLSearchParams();

    const username = tokenCredentials.username;
    const password = tokenCredentials.password;
    const grant_type = tokenCredentials.grant_type;

    params.append('username', `${username}`)
    params.append('password', `${password}`)
    params.append('grant_type', `${grant_type}`)

    try {
      const response = await api.post('token',params);
      const userToken = response.data.access_token;
      localStorage.setItem('userToken', userToken);
      window.location.href = '/app';
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div id="page-landing">
      <div className="content-wrapper">

        <main>
          <h1>Administração <img src={logoImg} className="landingImg" alt="CompreMaisAki" /></h1>
          <p>verificação de dados App</p>
          <p>AlphaTest 0.0.3</p>

          <div className="input-block">
            <label htmlFor="about">Usuário:</label>
            <input 
              id="user" 
              maxLength={300}
              value={user}
              onChange={event => setUser(event.target.value)} />
          </div>

          <div className="input-block">
            <label htmlFor="name">Senha:</label>
            <input 
              type="password"
              id="name" 
              value={password} 
              onChange={event => setPassword(event.target.value)} />
          </div>
          

        </main>

        <div className="location">
          <strong>Nova Santa Rita</strong>
          <span>Rio Grande do Sul</span>
        </div>

        <button type="button" onClick={() => handleAccess()} className="enter-app">
          <FiArrowRight size="26" color="#fff" />
        </button>
      </div>
    </div>
  ); 
}

export default Landing;