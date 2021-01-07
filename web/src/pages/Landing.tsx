import React, { useState } from 'react';
import { FiArrowRight } from 'react-icons/fi'
import { Link } from 'react-router-dom';

import '../styles/pages/landing.css';

function Landing() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div id="page-landing">
      <div className="content-wrapper">

        <main>
          <h1>Administração Hábil</h1>
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
          <strong>Canoas</strong>
          <span>Rio Grande do Sul</span>
        </div>

        <Link to="/app" className="enter-app">
          <FiArrowRight size="26" color="rgba(0, 0, 0, 0.6)" />
        </Link>
      </div>
    </div>
  ); 
}

export default Landing;