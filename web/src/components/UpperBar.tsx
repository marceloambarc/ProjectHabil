import React from 'react';
import { FaKey, FaWhatsapp } from 'react-icons/fa';
import { FiArrowLeft, FiArrowRight, FiHome, FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import Img from '../images/adaptive-icon.png';
import '../styles/components/upperbar.css';

interface Moderator {
  role: any;
}

export default function ({role} : Moderator){

  function renderModeratorsButton(){
		if(role === 'adm'){
			return (
				<div className="upper-button-block">
				<	label>Moderadores</label>
					<Link to="/Moderators" className="upper-enter-path">
						<FiUser size="26" color="white" />
					</Link>
				</div>
			)
		}
	}

	return (
		<header className="app-header">

			<div className="upper-button-wrapper">

			<div className="upper-button-block">
				<label>Início</label>
        <Link to="/app" className="upper-enter-path">
          <FiHome size={24} color="white" />
        </Link>
      </div>

				{renderModeratorsButton()}
				<div className="upper-button-block">
          <label>WhatsApp</label>
          <Link to="/WhatsApp" className="upper-enter-path">
            <FaWhatsapp size="26" color="white" />
          </Link>
        </div>

				<div className="upper-button-block">
					<label>Empresas</label>
          <Link to="/companies" className="upper-enter-path">
            <FiArrowRight size="26" color="white" />
          </Link>
        </div>

				<img src={Img} alt='Habil' />

				<div className="upper-button-block">
					<label>Promoções</label>
          <Link to="/products" className="upper-enter-path">
            <FiArrowRight size="26" color="white" />
          </Link>
        </div>

				<div className="upper-button-block">
          <label>Senhas</label>
          <Link to="/forgot" className="upper-enter-path">
            <FaKey size="26" color="white" />
          </Link>
        </div>

				<div className="upper-button-block">
					<label>Sair</label>
					<Link to="/" className="upper-enter-path">
						<FiArrowLeft size={24} color="#FFF" />
					</Link>
				</div>

			</div>

		</header>
	)

}