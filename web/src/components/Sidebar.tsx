import React, { useEffect, useState } from 'react';
import { FiArrowLeft, FiArrowRight, FiChevronUp, FiHome } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import Img from '../images/adaptive-icon.png';
import api from '../services/api';
import '../styles/components/sidebar.css';

interface Admin {
  role: number;
}

export default function Sidebar() {
  const [admins, setAdmins] = useState<Admin[]>([]);

  useEffect(() => {
    api.get('admin').then(response => {
      setAdmins(response.data);
    });
  }, []);

  return (
    <aside className="app-sidebar">
      <img src={Img} alt="Habil" />

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

          {admins.map(admin => {
            if(admin.role == 1){
              <div>
                <label htmlFor="master">Master</label>
                <Link to="/master" className="enter-path">
                  <FiChevronUp size="26" color="rgba(0, 0, 0, 0.6)" />
                </Link>
              </div>
            }
          })}

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