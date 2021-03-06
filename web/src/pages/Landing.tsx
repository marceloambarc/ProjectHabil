import React, { useState } from 'react';
import { FiArrowRight } from 'react-icons/fi'
import api from '../services/api';
import { withRouter, useHistory } from 'react-router-dom'; 

import logoImg from '../images/cmatextlogo.png';

import '../styles/pages/landing.css';
import tokenCredentials from '../services/token.json';

//CORRIGIR button para MODELO REACT-ROUTER-DOM; Verificar utilizacao de funcoes

function Landing() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  
  const tokenGrantType = tokenCredentials.grant_type;

  async function handleAccess(){
    const params = new URLSearchParams();
    params.append('username', user)
    params.append('password', password)
    params.append('grant_type', tokenGrantType)
    try {
      const response = await api.post('token',params);
      const userToken = response.data.access_token;

      localStorage.setItem('userToken', userToken);
      history.push("/app",{
        params: {
          user: user,
        }
      });
    }catch(err){
      alert('Login não permitido.');
    }
  }

  return (
    <div id="page-landing">
      <div className="content-wrapper">

        <main>
          <h1>Administração <img src={logoImg} className="landingImg" alt="CompreMaisAki" /></h1>
          <p>verificação de dados App</p>
          <p>BetaTest 2.0</p>

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
          <FiArrowRight className="pngWelcome" color="#fff" />
        </button>
        
      </div>
    </div>
  ); 
}

export default withRouter(Landing);