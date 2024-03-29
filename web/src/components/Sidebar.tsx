import React from 'react';
import { FaKey, FaWhatsapp } from 'react-icons/fa';
import { FiArrowLeft, FiArrowRight, FiHome, FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import Img from '../images/adaptive-icon.png';
import '../styles/components/sidebar.css';

interface Moderator {
  role: any;
}

export default function Sidebar({role} : Moderator) {

  function renderModeratorsButton(){
    if(role === 'adm'){
      return(
        <div className="button-block">
          <label>Moderadores</label>
          <Link to="/Moderators" className="enter-path">
            <FiUser size="26" color="white" />
          </Link>
        </div>
      );
    } else {
      return (
        <div className="button-placeholder">
          
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

          <div className="button-block">
            <label>Senhas</label>
            <Link to="/forgot" className="enter-path">
              <FaKey size="26" color="white" />
            </Link>
          </div>

          <div className="button-block">
            <label>WhatsApp</label>
            <Link to="/WhatsApp" className="enter-path">
              <FaWhatsapp size="26" color="white" />
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