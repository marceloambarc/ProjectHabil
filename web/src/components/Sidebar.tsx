import React, { useState, useEffect } from 'react';
import { FiArrowLeft, FiArrowRight, FiHome } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import Img from '../images/adaptive-icon.png';
import '../styles/components/sidebar.css';

interface Moderator {
  id: number;
  user: string;
  role: string;
}

export default function Sidebar() {
  const [isLoading, setIsLoading] = useState(false);
  const getModerator = localStorage.getItem('9084100');
  const [moderator] = useState(`${getModerator}`)

  function renderModeratorsButton(){
    if(moderator == 'adm'){
      return(
        <div className="button-block">
          <label>Promoções</label>
          <Link to="/products" className="enter-path">
            <FiArrowRight size="26" color="white" />
          </Link>
        </div>
      );
    }
  }

  return (
    <aside className="app-sidebar">
      <img src={Img} alt="Habil" />

      <div className="home-button">
        <Link to="/app" className="enter-path">
          <FiHome size="26" color="white" />
        </Link>
      </div>
        
        <div className="button-wrapper">
          {renderModeratorsButton()}

          <div className="button-block">
            <label>Promoções</label>
            <Link to="/products" className="enter-path">
              <FiArrowRight size="26" color="white" />
            </Link>
          </div>

          <div className="button-block">
            <label>Empresas</label>
            <Link to="/companies" className="enter-path">
              <FiArrowRight size="26" color="white" />
            </Link>
          </div>


        </div>


      <footer>
        <label>Sair</label>
        <Link to="/" className="enter-path">
          <FiArrowLeft size={24} color="#FFF" />
        </Link>
      </footer>

    </aside>
  )
}