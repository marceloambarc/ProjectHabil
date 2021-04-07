import React, { useEffect, useState } from 'react';
import { GiConfirmed } from 'react-icons/gi';

import Sidebar from '../../components/Sidebar';
import '../../styles/pages/controlmap.css';
import '../../styles/pages/home.css';

import api from '../../services/api';

import logoImg from '../../images/cmatextlogo.png';

interface Admin {
  id: number,
  user: string,
  role: string,
}

function Moderators(){
    //Realocar Token
    const getUserToken = localStorage.getItem('userToken');

    const [admins, setAdmins] = useState<Admin[]>([]);
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userToken] = useState(`${getUserToken}`)
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      if(isLoading) return;

      //Iniciar Carregamento
      setIsLoading(true);

      //Carregamento dos ADMINS
      api.get('admin',{
        headers: {'Authorization': 'Bearer '+userToken}
      }).then(adm => {
        setAdmins(adm.data);
        //Finalizar Carregamento
        setIsLoading(false);
      }).catch(err => {
        alert('Ops! Tivemos um erro.');
      })
    }, []);

    async function handleCreateNewModerator(){
        
      if(password == confirmPassword){
         console.log("certo");
      }else{
        alert("senha nao confere");
      }
    }

    // TABELA EM COMPONENT
    function renderTable(){
      if(isLoading){
        return (
          <div>
            <h1>CARREGANDO...</h1>
          </div>
        );
      }else{
        return (
          <table id="companies">
            <tbody>
            <tr>
              <th>Admin</th>
              <th>Função</th>
              <th className="noWrap">Comandos</th>
            </tr>

            {admins.map(admin => {
              
                return(
                    <tr key={admin.id}>
                    <td>{admin.user}</td>
                    <td>{admin.role}</td>
                    <td>
                      <p>placeholder</p>
                    </td>
                  </tr>
                );
            })}
            </tbody>
          </table>
        );
      }
    }

  return(
    <div id="page-control-map">
      <Sidebar />
      <main>
        <div className="control-map">

          <div className="text">
            <h1>Moderadores</h1>
          </div>
            <h2 className="imagesText"><img src={logoImg} className="landingImg" alt="CompreMaisAki" /></h2>
          <div className="advRow">
            <div className="advCol">
              <label>Adicionar Moderador</label>
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
              id="password" 
              value={password} 
              onChange={event => setPassword(event.target.value)} />
            <label htmlFor="name">Confirme a Senha:</label>
            <input 
              type="password"
              id="confirmPassword" 
              value={confirmPassword} 
              onChange={event => setConfirmPassword(event.target.value)} />
          </div>
              
              <div className="button-block">
                <button type="button" onClick={() => handleCreateNewModerator()} className="changeImageButton">
                  <GiConfirmed size="26" color="#fff" />
                </button>
              </div>
            </div>
          </div>

        </div>

        <div className="control-map">
        <div className="table-container">
          {renderTable()}
        </div>
        </div>
      </main>
    </div>
  );
}

export default Moderators;