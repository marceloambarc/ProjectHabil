import React from 'react';
import { FiArrowLeft, FiArrowRight, FiHome } from 'react-icons/fi';
import { useHistory, Link } from 'react-router-dom';

import HabilImg from '../images/logo.svg';

import '../styles/components/sidebar.css';

export default function Sidebar() {

  return (
    <aside className="app-sidebar">
      <img src={HabilImg} alt="Habil" />

      <div className="home-button">
        <Link to="/app" className="enter-path">
          <FiHome size="26" color="rgba(0, 0, 0, 0.6)" />
        </Link>
      </div>
        
        <div className="button-wrapper">

          <div className="button-block">
            <label htmlFor="button">Produtos</label>
            <Link to="/products" className="enter-path">
              <FiArrowRight size="26" color="rgba(0, 0, 0, 0.6)" />
            </Link>
          </div>

          <div className="button-block">
            <label htmlFor="about">Empresas</label>
            <Link to="/companies" className="enter-path">
              <FiArrowRight size="26" color="rgba(0, 0, 0, 0.6)" />
            </Link>
          </div>

        </div>


      <footer>
        <label htmlFor="button">Sair</label>
        <Link to="/" className="enter-path">
          <FiArrowLeft size={24} color="#FFF" />
        </Link>
      </footer>

    </aside>
  )
}