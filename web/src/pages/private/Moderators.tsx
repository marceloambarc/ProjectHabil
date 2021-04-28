import React, { useEffect, useState } from 'react';
import { GiConfirmed } from 'react-icons/gi';
import { FiAlertOctagon } from 'react-icons/fi';
import { GiArmorUpgrade, GiArmorDowngrade } from 'react-icons/gi';

import Sidebar from '../../components/Sidebar';
import '../../styles/pages/controlmap.css';
import '../../styles/pages/home.css';
import '../../styles/pages/switch.css';

import api from '../../services/api';

import logoImg from '../../images/cmatextlogo.png';

interface Admin {
  id: number,
  user: string,
  role: string,
}

//Esconder do SIDEBAR Para Moderadores
function Moderators(){
    //Realocar Token
    const getUserToken = localStorage.getItem('userToken');

    const [admins, setAdmins] = useState<Admin[]>([]);
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userToken] = useState(`${getUserToken}`)
    const [isLoading, setIsLoading] = useState(true);
    const [role, setRole] = useState('');

    async function loadAdmins(){
      api.get('admin',{
        headers: {'Authorization': 'Bearer '+userToken}
      }).then(adm => {
        setAdmins(adm.data);
      }).catch(err => {
        alert('Ops! Tivemos um erro.');
      });
    }

    async function getRoles(){
      api.get('admin/tk',{
        headers: {'Authorization': 'Bearer '+userToken}
      }).then(res => {
        setRole(res.data.role);
      }).catch(err => {
        setRole('guest');
      });
    }

    useEffect(() => {
      if(!isLoading) return;
      //Carregamento dos ADMINS
      loadAdmins();
      getRoles();
      //Finalizar Carregamento
      setIsLoading(false);
    }, []);

    async function handleCreateNewModerator(){
        
      if(password == confirmPassword){
        api.post('admin',{
          user,
          password,
          role: 'adm'
        },{
          headers: {'Authorization': 'Bearer '+userToken}
        }).then(res => {
          alert("Usuário Cadastrado!");
          loadAdmins();
        }).catch(err => {
          alert('Tivemos um erro, entre em contato com o Suporte');
        })
      }else{
        alert("Senha não confere.");
      }
    }

    async function handleCanceled({admin}:{admin:Admin}){
      api.delete(`admin/${admin.id}`,{
        headers: {'Authorization': 'Bearer '+userToken}
      }).then(res => {
        alert("Usuário Deletado");
        loadAdmins();
      }).catch(err => {
        alert("Tivemos um Erro.");
      });
    }

    async function handlePromote({admin}:{admin:Admin}){
      api.put(`admin/${admin.id}`,{
        role: "adm"
      },{
        headers: {'Authorization': 'Bearer '+userToken}
      }).then(res => {
        alert("Usuário Promovido");
        loadAdmins();
      }).catch(err => {
        alert("Tivemos um Erro.")
      });
    }

    async function handleRelegate({admin}:{admin:Admin}){
      api.put(`admin/${admin.id}`,{
        role: "guest"
      },{
        headers: {'Authorization': 'Bearer '+userToken}
      }).then(res => {
        alert("Usuário Depreciado");
        loadAdmins();
      }).catch(err => {
        alert("Tivemos um Erro.")
      });
    }

    //---RENDERIZAR BOTOES---//
    function renderButtons({admin}:{admin:Admin}){
      if(admin.role == 'guest'){
        return(
          <div className="button-row">
            <div className="button-col">
              <button className="cancel" onClick={() => handleCanceled({admin})}>
                <FiAlertOctagon size="13" color="#FFF" />
              </button>
            </div>
            
            <div className="button-col">
              <button className="aprove" onClick={() => handlePromote({admin})}>
                <GiArmorUpgrade size="13" color="#FFF" />
              </button>
            </div>
          </div>
        );
      }else{
        return(
          <div className="button-row">
            <div className="button-col">
              <button className="cancel" onClick={() => handleCanceled({admin})}>
                <FiAlertOctagon size="13" color="#FFF" />
              </button>
            </div>
            
            <div className="button-col">
              <button className="aprove" onClick={() => handleRelegate({admin})}>
                <GiArmorDowngrade size="13" color="#FFF" />
              </button>
            </div>
          </div>
        );
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
                      {renderButtons({admin})}
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
      <Sidebar role={role} />
      <main>
        <div className="control-map">

          <div className="text">
            <h1>Moderadores</h1>
          </div>
            <h2 className="imagesText"><img src={logoImg} className="landingImg" alt="CompreMaisAki" /></h2>
            <h1 style={{fontSize:'20px', color:'#8fa7b3'}}>Adicionar Moderador</h1>
          <div className="advRow">
            <div className="advCol">
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

                {/*<label for="cars">Choose a car:</label>

                  <select name="cars" id="cars">
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>
                  </select>*/}

              </div>
            </div>
          </div>

          <div className="button-block">
              <button type="button" onClick={() => handleCreateNewModerator()} className="createModeratorButton">
                <GiConfirmed size="26" color="#fff" />
              </button>
            </div>

        </div>

        <div className="control-map">
        <div className="table-container">
          <h1>Moderadores Cadastrados</h1>
          {renderTable()}
        </div>
        </div>
      </main>
    </div>
  );
}

export default Moderators;