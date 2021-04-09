import React from 'react';
import { FiArrowLeft, FiArrowRight, FiHome } from 'react-icons/fi';
import { RiAdminLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

import Img from '../images/adaptive-icon.png';
import '../styles/components/sidebar.css';


export default function Sidebar() {

  return (
    <aside className="app-sidebar">
      <img src={Img} alt="Habil" />

      <div className="home-button">
        <Link to="/app" className="enter-path">
          <FiHome size="26" color="white" />
        </Link>
      </div>
        
        <div className="button-wrapper">
          <div className="button-block">
            <label>Moderadores</label>
            <Link to="/moderators" className="enter-path">
              <RiAdminLine size="26" color="white" />
            </Link>
          </div>

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