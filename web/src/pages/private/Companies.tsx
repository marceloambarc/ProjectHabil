import React, { useState, useEffect } from 'react';
import { FiAlertOctagon, FiCheck, FiCheckCircle, 
FiAlertCircle, FiXCircle, FiBook, FiSearch, FiSend } from 'react-icons/fi';
import Modal from 'react-modal';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useHistory } from 'react-router-dom';

import UpperBar from '../../components/UpperBar';
import Sidebar from '../../components/Sidebar'
import api from '../../services/api';
import { Company } from '../../libs/companyProps';

import '../../styles/pages/controlmap.css';
import '../../styles/pages/companies_buttons.css';
import '../../styles/pages/table.css';
import { host, port, fromEmail, pass } from '../../services/email.json';
import { mailer } from '../../services/mailer.json';
import PromoInput from '../../components/PromoInput';

Modal.setAppElement('#root')

//SORT POR ÚLTIMAS CADASTRADAS
function Companies(){
  const getUserToken = localStorage.getItem('userToken');
  const [userToken] = useState(`${getUserToken}`)
  const [companies, setCompanies] = useState<Company[]>([]);
  const [canceledCompanies, setCanceledCompanies] = useState<Company[]>([]);
  const [isCanceled, setIsCanceled] = useState(false);
  const [active, setActive] = useState(0);
  const [base] = useState('data:image/png;base64');
  const [isLoading, setIsLoading] = useState(true);
  const [role, setRole] = useState('');
  const [searchCnpj, setSearchCnpj] = useState('');
  const [maxProm, setMaxProm] = useState(0);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [viewImage, setViewImage] = useState('');
  const [viewName, setViewName] = useState('');

  const history = useHistory();

  //----CARREGAMENTO DE DADOS E LOADING INICIAL DE TELA ----///
  async function getRoles(){
    api.get('admin/tk',{
      headers: {'Authorization': 'Bearer '+userToken}
    }).then(res => {
      setRole(res.data.role);
    }).catch(err => {
      history.push('/login');
    });
  }

  async function getCompanies(){
    api.get('companies/all').then(response => {

      //Realocar Resposta para UseState
      setCompanies(response.data);

    }).catch(err => {
      alert('Erro ao acessar Tabela de Empresas Canceladas.');
    })
  }

  async function getCanceledCompanies(){
    api.get('deleted_companies').then(response => {

      //Realocar Resposta para UseState
      setCanceledCompanies(response.data);

    }).catch(err => {
      alert('Erro ao acessar Tabela de Empresas.');
    })
  }

  useEffect(() => {
    if(!isLoading) return;

    getRoles();
    getCompanies();
    getCanceledCompanies()

    //Finalizar Carregamento
    setIsLoading(false);
  }, []);

  function openModal({company}:{company:Company}) {
    setIsOpen(true);
    setViewImage(`${company.image}`);
    setViewName(`${company.name}`);
  }

  function closeModal(){
    setIsOpen(false);
    setViewImage('');
    setViewName('');
  }

  //----RENDERIZAR TÍTULO DA TABELA
  function renderTitle(){
    if(active === 0){
      return(
        <h1 style={{fontSize:'22px'}}>Empresas Inativas</h1>
      );
    }else if(active === 1){
      return(
        <h1 style={{fontSize:'22px'}}>Empresas Ativas</h1>  
      );
    }else{
      return(
        <h1 style={{fontSize:'22px'}}>Empresas Canceladas</h1>
      );
    }
  }

  //----(PENDENTE) EXPAND IMAGE---//
  async function handleExpandImage({company}:{company:Company}){
    openModal({company});
  }

  //-----VIEWS------//
  async function handleViewInactive(){
    setActive(0)
    setIsCanceled(false);
  }

  async function handleViewActive(){
    setActive(1)
    setIsCanceled(false);
  }

  async function handleViewCanceled(){
    setActive(2)
    setIsCanceled(true);
  }

  // FUNÇÕES DE BOTOES

  async function handleConfirmInactive({company}:{company:Company}){
    api.put(`companies/${company.id}`,{
      // 0 === Empresa INATIVA
      is_active: 0,
    },{
      headers: {'Authorization': 'Bearer '+userToken}
    }).then(() => {
      api.get('companies/all').then(response => {
        setCompanies(response.data);
        fetch(`${mailer}/mailgun`,{
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'mode': 'node-cors'
          },
          body: JSON.stringify({
            host: host,
            port: port,
            fromEmail: fromEmail,
            pass: pass,
            toEmail: company.email,
            title: 'Empresa Inativa',
            message: 'Sua empresa Foi Inativada Pelo Administrador. Entre em contato com o Suporte pelo Aplicativo para mais informações.',
            content: 'Sua empresa Foi Inativada Pelo Administrador. Entre em contato com o Suporte pelo Aplicativo para mais informações.'
          })
        }).then(() => {
          alert('Email Enviado!');
        }).catch(err => {
          alert('Erro com a conexão com encaminhador de Email. Entre em contato com o suporte.');
        });
      }).then(() => {
        alert('Empresa Inativada com Sucesso.');
      }).catch(err => {
        alert('Erro ao encaminhar Email de Inativação. Entre em contato com o suporte.');
      })
    }).catch(err => {
      alert('Tivemos um erro, entre em contato com o Suporte');
    });
  }

  //---MANIPULAR EMPRESAS (INSERIR CARREGAMENTO VISUAL)---//
  async function handleInactive({company}:{company:Company}){
    confirmAlert({
      title: `Inativar ${company.name}?`,
      message: `Você tem certeza que deseja inativar a empresa "${company.name}"?`,
      buttons: [
        {
          label: 'Sim',
          onClick: ()  => handleConfirmInactive({company})
        },
        {
          label: 'Não',
          onClick: () => {}
        }
      ]
    })
  }

  async function handleConfirmCanceled({company}:{company:Company}){
    api.delete(`companies/${company.id}`,{
      headers: {'Authorization': 'Bearer '+userToken}
    }).then(() => {
      api.get('companies/all').then(response => {
        setCompanies(response.data);
        fetch(`${mailer}/mailgun`,{
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'mode': 'node-cors'
          },
          body: JSON.stringify({
            host: host,
            port: port,
            fromEmail: fromEmail,
            pass: pass,
            toEmail: company.email,
            title: 'Empresa Cancelada',
            message: 'Sua empresa Foi Cancelada Pelo Administrador. Entre em contato com o Suporte pelo Aplicativo para mais informações.',
            content: 'Sua empresa Foi Cancelada Pelo Administrador. Entre em contato com o Suporte pelo Aplicativo para mais informações.'
          })
        }).then(() => {
          alert('Email Enviado!');
        }).catch(err => {
          alert('Erro com a conexão com encaminhador de Email. Entre em contato com o suporte.');
        });
      }).then(() => {
        alert('Empresa Cancelada com Sucesso.');
      }).catch(err => {
        alert('Erro ao encaminhar Email de Cancelamento. Entre em contato com o suporte.');
      })
    }).catch(err => {
      alert('Tivemos um erro, entre em contato com o Suporte');
    });
  }

  async function handleCanceled({company}:{company:Company}){
    confirmAlert({
      title: `Deletar a Empresa ${company.name}`,
      message: `Você tem certeza que deseja Deletar "${company.name}"?`,
      buttons: [
        {
          label: 'Sim',
          onClick: ()  => handleConfirmCanceled({company})
        },
        {
          label: 'Não',
          onClick: () => {}
        }
      ]
    });
  }

  async function handleConfirmActive({company}:{company:Company}){
    api.put(`companies/${company.id}`,{
      // 1 === Empresa ATIVA
      is_active: 1,
      max_prom: maxProm
    },{
      headers: {'Authorization': 'Bearer '+userToken}
    }).then(() => {
      api.get('companies/all').then(response => {
        setCompanies(response.data);
        fetch(`${mailer}/mailgun`,{
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'mode': 'node-cors'
           },
          body: JSON.stringify({
            host: host,
            port: port,
            fromEmail: fromEmail,
            pass: pass,
            toEmail: company.email,
            title: 'Empresa Ativada',
            message: 'Sua empresa Foi Ativada Pelo Administrador. Entre em contato com o Suporte pelo Aplicativo para mais informações.',
            content: 'Sua empresa Foi Ativada Pelo Administrador. Entre em contato com o Suporte pelo Aplicativo para mais informações.'
          })
        }).then(() => {
          alert('Email Enviado!');
        }).catch(err => {
          alert('Erro com a conexão com encaminhador de Email. Entre em contato com o suporte.');
        });
      }).then(() => {
        alert('Empresa Ativada com Sucesso.');
      }).catch(err => {
        alert('Erro ao encaminhar Email de Ativação. Entre em contato com o suporte.');
      })
    }).catch(err => {
      alert('Tivemos um erro, entre em contato com o Suporte');
    });
  }

  async function handleActive({company}:{company:Company}){
    confirmAlert({
      title: `Ativar Empresa ${company.name}?`,
      message: `Você tem certeza que deseja Ativar a Empresa ${company.name}?`,
      buttons: [
        {
          label: 'Sim',
          onClick: ()  => handleConfirmActive({company})
        },
        {
          label: 'Não',
          onClick: () => {}
        }
      ]
    });
  }

  // RENDERIZAR BOTOES NA TABELA ATIVAS(1) - INATIVAS(0) - CANCELADAS(2)
  function renderButton({company}:{company:Company}){
    if(active === 0){
      return(
        <div className="button-row">
          <div className="button-col">
            <button className="cancel" onClick={() => handleCanceled({company})}>
              <FiAlertOctagon size="13" color="#FFF" />
            </button>
          </div>
          
          <div className="button-col">
            <button className="aprove" onClick={() => handleActive({company})}>
              <FiCheck size="13" color="#FFF" />
            </button>
          </div>
        </div>
      );
    }else if(active === 1){
      return (
        <div className="button-row">
          <div className="button-col">
            <button className="inactive" onClick={() => handleInactive({company})}>
              <FiBook size="13" color="#FFF" />
            </button>
          </div>
          
          <div className="button-col">
            <button className="cancel" onClick={() => handleCanceled({company})}>
              <FiAlertOctagon size="13" color="#FFF" />
            </button>
          </div>
        </div>
      );
    }
  }

  function handleSetSearchCnpj(event:string){
    setSearchCnpj(event);
  }

  function handleSetMaxProm(maxProm:any, event:string){
    setMaxProm(parseInt(event));
  }

  function renderHeader(){
    return (
      <div className="search-button-row">
        <div className="search-button-col">
        <h1 style={{fontSize:'10px'}}> </h1>
          <input className="search-input" type="text" placeholder="Procure CNPJ" value={searchCnpj} onChange={event => handleSetSearchCnpj(event?.target.value)} />
          <button className="aprove" onClick={() => {}}>
            <FiSearch size="13" color="#FFF" />
          </button>
        </div>
        <div className="search-button-col">
          <div className="max-promo-row">
            <div className="max-promo-col">
            <h1 style={{fontSize:'10px', marginBottom: '-5px', color: '#017895'}}>Máx. Promoções para Aprovação.</h1>
              <input className="max-promo-input" placeholder="Máx. Promoções para Aprovação" type="number" value={maxProm} onChange={event => handleSetMaxProm(maxProm, event.target.value)} />
            </div>
          </div>
        </div>
      </div>
    )
  }

  function renderCommands(){
    if(isCanceled){
      return;
    }else{
      return (
        <th className="noWrap td">Comandos</th>
      );
    }
  }

  function renderPromos(){
    if(isCanceled){
      return;
    }else if(active === 0){
      return;
    } else {
      return (
        <th>Nº de Promoções</th>
      );
    }
  }

  function renderPromoInput({company}:{company:Company}) {
    if(isCanceled){
      return;
    } else if(active === 0) {
      return;
    } else {
      return (
        <td>
          <PromoInput 
            maxProm={company.max_prom} 
            companyId={company.id} 
            companyName={company.name} 
            userToken={userToken}
          />
        </td>
      );
    }
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
          <th>Empresa</th>
          <th>Ramo</th>
          <th>Palavras-Chaves</th>
          <th>cnpj</th>
          <th>Telefone</th>
          { renderPromos() }
          <th>Email</th>
          <th>Endereço</th>
          <th>Bairro</th>
          <th>Cidade</th>
          <th>UF</th>
          <th>Foto</th>
          { renderCommands() }
        </tr>

        {
          isCanceled
          ?
          canceledCompanies.map(company => {
            return (
                <tr key={company.id}>
                <td>{company.name}</td>
                <td>{company.business}</td>
                <td>{company.keywords}</td>
                <td>{company.cnpj}</td>
                <td>{company.phone}</td>
                <td className="email-column">{company.email}</td>
                <td>{company.address}</td>
                <td>{company.district}</td>
                <td>{company.city}</td>
                <td>{company.uf}</td>
                <td onClick={() => handleExpandImage({company})}>
                  <img 
                    src={base + ',' + company.image} 
                    style={{width: '30px',display: 'flex',justifyContent: 'center', cursor: 'pointer'}} 
                    className="landingImg" alt="CompreMaisAki" 
                  />
                </td>
              </tr>
            );
          })
          :
          companies.map(company => {
            // ACTIVE MANIPULADO NO USESTATE()
            if(company.is_active == active){
              return(
                  <tr key={company.id}>
                  <td>{company.name}</td>
                  <td>{company.business}</td>
                  <td>{company.keywords}</td>
                  <td>{company.cnpj}</td>
                  <td>{company.phone}</td>
                  { renderPromoInput({company}) }
                  <td className="email-column">{company.email}</td>
                  <td>{company.address}</td>
                  <td>{company.district}</td>
                  <td>{company.city}</td>
                  <td>{company.uf}</td>
                  <td onClick={() => handleExpandImage({company})}>
                    <img 
                      src={base + ',' + company.image} 
                      style={{width: '30px',display: 'flex',justifyContent: 'center', cursor: 'pointer'}} 
                      className="landingImg" alt="CompreMaisAki" 
                    />
                  </td>
                  <td>
                    {renderButton({company})}
                  </td>
                </tr>
              );
            }else{
              return;
            }
          })
        }
        
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

          <h1 style={{fontSize:'22px'}}>Administração de Empresas</h1>

          <div className="companies-button-wrapper">

            <div className="companies-button">
              <label htmlFor="about">Ativas</label>
              <button onClick={() => handleViewActive()} id="button">
                <FiCheckCircle size="26" />
              </button>
            </div>

            <div className="companies-button">
              <label htmlFor="about">Inativas</label>
              <button onClick={() => handleViewInactive()} id="button">
                <FiAlertCircle size="26" />
              </button>
            </div>

            <div className="companies-button">
              <label htmlFor="about">Canceladas</label>
              <button onClick={() => handleViewCanceled()} id="button">
                <FiXCircle size="26" />
              </button>
            </div>

          </div>
          
          <div className="table-container">
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            className="Modal"
            contentLabel="Example Modal"
            overlayClassName="Overlay"
          >
            <h2>Empresa {viewName}</h2>
            <img src={base + ',' + viewImage} style={{width: '100%'}} />
            <div>
              <button className="modalButton" onClick={closeModal}>FECHAR</button>
            </div>
          </Modal>
          {renderHeader()}
          {renderTitle()}
          {renderTable()}

          </div>
        </div>
      </main>
    </div>
  );
}

export default Companies;