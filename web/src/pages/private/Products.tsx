import React, { useState, useEffect } from 'react';
import { FiAlertOctagon, FiCheck, 
FiCheckCircle, FiAlertCircle, FiBook } from 'react-icons/fi';
import Modal from 'react-modal';

import Sidebar from '../../components/Sidebar';
import Validation from '../../components/Validation';
import api from '../../services/api';
import { host, port, fromEmail, pass } from '../../services/email.json';

import '../../styles/pages/controlmap.css';
import '../../styles/pages/card.css';
import '../../styles/pages/card-columns.css';

interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
  date: string;
  company_id: number;
  image: string;
  validade: string;
  discount: string;
  is_active: number;
}

function Products(){
  const userToken = localStorage.getItem('userToken');
  const [products, setProducts] = useState<Product[]>([]);
  const [active, setActive] = useState(0);
  const [validate] = useState('');
  const [base] = useState('data:image/png;base64');
  const [isLoading, setIsLoading] = useState(true);
  const [role, setRole] = useState('');

  const [modalIsOpen, setIsOpen] = useState(false);
  const [viewImage, setViewImage] = useState('');
  const [viewName, setViewName] = useState('');

  useEffect(() => {
    if(!isLoading) return;

    api.get('products/all').then(products => {
      setProducts(products.data);
      api.get('admin/tk',{
        headers: {'Authorization': 'Bearer '+userToken}
      }).then(res => {
        setRole(res.data.role);
        setIsLoading(false);
      }).catch(err => {
        setRole('guest');
        setIsLoading(false);
      });
    }).catch(err => {
      alert("Ops! Tivemos um erro");
      setIsLoading(false);
    });
  }, []);

  function openModal({product}:{product:Product}) {
    setIsOpen(true);
    setViewImage(`${product.image}`);
    setViewName(`${product.name}`);
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
          <h1 style={{fontSize:'22px'}}>Promoções Inativas</h1>
        )
      }else{
        return(
          <h1 style={{fontSize:'22px'}}>Promoções Ativas</h1>  
        )
      }
    }

   //----(PENDENT)EXPAND IMAGE---//
   async function handleExpandImage({product}:{product:Product}){
    openModal({product});
  }

  //---CANCEL/ACTIVE/INACTIVE BUTTON FUNCTIONS---//
  async function handleCanceled({product}:{product:Product}){
    api.delete(`products/${product.id}`,{
      headers: {'Authorization': 'Bearer '+userToken}
    }).then(() => {
      fetch('http://habil.servehttp.com:5003/mailgun',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          host: host,
          port: port,
          fromEmail: fromEmail,
          pass: pass,
          toEmail: /*WE NEED TO INSEERT HERE*/'',
          title: 'Produto Cancelado',
          message: `O produto ${product.name} Foi Inativada Pelo Administrador. Entre em contato com o Suporte pelo Aplicativo para mais informações.`,
          content: `O produto ${product.name} Foi Inativada Pelo Administrador. Entre em contato com o Suporte pelo Aplicativo para mais informações.`
        })
      }).then(() => {
        api.get('products/all').then(response => {
          setProducts(response.data);
        });
      }).catch(err => {
        alert('Aconteceu um Erro ao acessar os Produtos. Entre em contato com o Suporte.')
      })
    }).catch(err => {
      alert('Tivemos um erro, entre em contato com o Suporte');
    });
  }

  async function handleActive({product}:{product:Product}){
    api.put(`products/${product.id}`,{
      is_active: 1,
      validate: validate
    },{
      headers: {'Authorization': 'Bearer '+userToken}
    }).then(res => {
      api.get('products/all').then(response => {
        setProducts(response.data);
      });
    }).catch(err => {
      alert('Tivemos um erro, entre em contato com o Suporte');
    });
  }

  async function handleInactive({product}:{product:Product}){
    api.put(`products/${product.id}`,{
      is_active: 0,
    },{
      headers: {'Authorization': 'Bearer '+userToken}
    }).then(() => {
      api.get('products/all').then(response => {
        setProducts(response.data);
      });
    }).catch(err => {
      alert('Tivemos um erro, entre em contato com o Suporte');
    });
  }

  //----VIEWS----///
  async function handleViewInactive(){
    setActive(0)
  }

  async function handleViewActive(){
    setActive(1)
  }

  // RENDERIZAR BOTOES NA TABELA ATIVAS(1) - INATIVAS(0) - NAO POSSUI CANCELADAS
  function renderButton({product}:{product:Product}){
    if(active === 0){
      return(
        <div className="button-row">
          <div className="button-col">
            <button className="cancel" onClick={() => handleCanceled({product})}>
              <FiAlertOctagon size="13" color="#FFF" />
            </button>
          </div>
              
          <div className="button-col">
            <button className="aprove" onClick={() => handleActive({product})}>
              <FiCheck size="13" color="#FFF" />
            </button>
          </div>
        </div>
      );
    }else if(active === 1){
      return(
        <div className="button-row">
          <div className="button-col">
            <button className="cancel" onClick={() => handleCanceled({product})}>
              <FiAlertOctagon size="13" color="#FFF" />
            </button>
          </div>
              
          <div className="button-col">
            <button className="inactive" onClick={() => handleInactive({product})}>
              <FiBook size="13" color="#FFF" />
            </button>
          </div>
        </div>
      );
    }
  }

  //-----(PENDENT)SORT-----//
  //async function handleViewPerDesc(){
  //  alert('DESC');
  //}

  //async function handleViewPerCompany(){
  //  alert('Company');
  //}

  //async function handleViewAlpha(){
  //  alert('AZ');
  //}

  //async function handleViewPerPrice(){
  // alert('Price');
  //}

  return(
    <div id="page-control-map">
      <Sidebar role={role} />
      <main>
        <div className="control-map">

          <h1 style={{fontSize:'22px'}}>Novas Promoções Cadastradas</h1>

          {/*<div className="companies-button-wrapper">

            <div className="companies-button">
              <label htmlFor="about">Últimas</label>
              <button onClick={() => {}} id="button">
                <FiLayers size="26" />
              </button>
            </div>

            <div className="companies-button">
              <label htmlFor="about">Empresas</label>
              <button onClick={() => {}} id="button">
                <FiBookOpen size="26" />
              </button>
            </div>

            <div className="companies-button">
              <label htmlFor="about">A-Z</label>
              <button onClick={() => {}} id="button">
                <FiArrowDownCircle size="26" />
              </button>
            </div>

            <div className="companies-button">
              <label htmlFor="about">Preço</label>
              <button onClick={() => {}} id="button">
                <FiDollarSign size="26" />
              </button>
            </div>

          </div>*/}

          <div className="companies-button-wrapper">
            <div className="companies-button">
              <label htmlFor="about">Ativas</label>
              <button onClick={() => handleViewActive()} id="button">
                <FiCheckCircle size="26" color="#FFF" />
              </button>
            </div>

            <div className="companies-button">
              <label htmlFor="about">Inativas</label>
              <button onClick={() => handleViewInactive()} id="button">
                <FiAlertCircle size="26" color="#FFF" />
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
              <h2>Promoção {viewName}</h2>
              <img src={base + ',' + viewImage} style={{width: '100%'}} alt="CompreMaisAki" />
              <div>
                <button className="modalButton" onClick={closeModal}>FECHAR</button>
              </div>
            </Modal>
            {renderTitle()}
           <table id="companies">
            <tbody>
            <tr>
              <th>Produto</th>
              <th>Preco</th>
              <th>Descricao</th>
              <th>Data</th>
              <th>Empresa</th>
              <th>Validade</th>
              <th>Desconto</th>
              <th>Imagem</th>
              <th className="noWrap">Comandos</th>
            </tr>

            {products.map(product => {
              if(product.is_active === active){
                return(
                    <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>R$ {product.price}</td>
                    <td>{product.description}</td>
                    <td>{product.date}</td>
                    <td>
                      {product.company_id}
                    </td>
                    <td>
                      <Validation active={active} validate={product.validade} promoName={product.name} productId={product.id} userToken={userToken} />
                    </td>
                    <td>{product.discount} %</td>
                    <td onClick={() => handleExpandImage({product})}>
                      <img 
                        src={base + ',' + product.image} 
                        style={{display: 'flex', justifyContent: 'center', width: '30px', cursor: 'pointer'}} 
                        className="landingImg" 
                        alt="CompreMaisAki"
                      />
                    </td>
                    <td>
                      {renderButton({product})}
                    </td>
                  </tr>
                );
              }
            })}
            </tbody>
          </table>
          </div>
        
        </div>
      </main>
    </div>
  );
}

export default Products;