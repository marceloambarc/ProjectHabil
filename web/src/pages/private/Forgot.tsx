import React, { useState, useEffect } from 'react';
import { FaKey } from 'react-icons/fa';
import randomWords from 'random-words';
import md5 from 'md5';
import { useHistory } from 'react-router-dom';

import UpperBar from '../../components/UpperBar';
import Sidebar from '../../components/Sidebar'
import api from '../../services/api';

import '../../styles/pages/controlmap.css';
import '../../styles/pages/companies_buttons.css';
import '../../styles/pages/table.css';

import { host, port, fromEmail, pass } from '../../services/email.json';

interface Company {
  id: number;
  business: string;
  cnpj: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  district: string;
  city: string;
  uf: string;
  password: string;
  image: string;
  keywords: string;
  is_active: string;
  reset_password: string;
}

//SORT POR ÚLTIMAS CADASTRADAS
function Forgot(){
  const getUserToken = localStorage.getItem('userToken');
  const [userToken] = useState(`${getUserToken}`)
  const [companies, setCompanies] = useState<Company[]>([]);
  const [active] = useState('1');
  const [isLoading, setIsLoading] = useState(true);
  const [role, setRole] = useState('');
  const history = useHistory();

  //----CARREGAMENTO DE DADOS E LOADING INICIAL DE TELA ----///

  function getForgot(){
    api.get('companies/all').then(response => {

      //Realocar Resposta para UseState
      setCompanies(response.data);

    }).catch(err => {
      alert('Ops! Tivemos um Erro.');
    });
  }

  async function getRoles(){
    api.get('admin/tk',{
      headers: {'Authorization': 'Bearer '+userToken}
    }).then(res => {
      setRole(res.data.role);
    }).catch(err => {
      history.push('/login');
    });
  }

  useEffect(() => {
    if(!isLoading) return;
    getForgot();
    getRoles();
    setIsLoading(false);
  }, []);

  async function handleSubmitPassword({company}:{company:Company}){
    const key = randomWords()
    const encryptedKey = md5(key);
    const finalKey = encryptedKey.substring(1,9);

    fetch("http://177.10.0.125:5003/mailgun",{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({       
        host: host,
        port: port,
        fromEmail: fromEmail,
        pass: pass,
        toEmail: company.email,
        title: 'Recuperação de Senha',
        message: 'Mensagem enviada pelo Aplicativo CompreMaisAki',
        content: `Segue sua senha temporária para a troca de acessar o Aplicativo:
        ${finalKey}`
      })
    }).then(res => {
      api.put(`companies/${company.id}`,{
        password: finalKey,
        is_active: 1
      },{
        headers: {'Authorization': 'Bearer '+userToken}
      }).then(res => {
        alert('Sucesso');
      }).catch(err => {
        alert('erro na emissao de nova chave.');
      });
      getForgot();
    }).catch(err => {
      alert('Erro no envio de recuperação da senha, Entre em contato com o suporte');
    });
  }


  // RENDERIZAR BOTOES NA TABELA ATIVAS(1) - INATIVAS(0) - CANCELADAS(2)
  function renderButton({company}:{company:Company}){
    return(
      <div className="button-row">
        <div className="button-col">
          <button className="cancel" onClick={() => handleSubmitPassword({company})}>
            <FaKey size="13" color="#FFF" />
          </button>
        </div>
      </div>
    );
  }

  // TABELA EM COMPONENTE
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
          <th>ID</th>
          <th>Empresa</th>
          <th>Email</th>
          <th>CNPJ</th>
          <th className="noWrap td">Comandos</th>
        </tr>

        {companies.map(company => {
          // ACTIVE MANIPULADO NO USESTATE()
          if(company.is_active == active && company.reset_password == '00000001'){
            return(
                <tr key={company.id}>
                <td>{company.id}</td>
                <td>{company.name}</td>
                <td>{company.email}</td>
                <td>{company.cnpj}</td>
                <td>
                  {renderButton({company})}
                </td>
              </tr>
            );
          }else{
            return;
          }
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
        <UpperBar role={role} />
        <div className="control-map">

          <h1 style={{fontSize:'22px'}}>Recuperação de Senha</h1>
          
          <div className="table-container">
          {renderTable()}

          </div>
        </div>
      </main>
    </div>
  );
}

export default Forgot;