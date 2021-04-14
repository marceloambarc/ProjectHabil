import React, { useEffect, useState, createRef } from 'react';
import { FaExchangeAlt } from 'react-icons/fa'

import Sidebar from '../../components/Sidebar';
import '../../styles/pages/controlmap.css';
import '../../styles/pages/home.css';

import loadingImg from '../../images/loading.gif';

import advImg1  from '../../images/content_id.png';
import advImg2 from '../../images/content_id.png';
import logoImg from '../../images/cmatextlogo.png';

//SOLICITAR ROTA DE ALTERACAO DE IMAGEM PARA CARREGAMENTO NO APP
function ControlMap(){
  const [img1, setImg1] = useState('');
  const [img2, setImg2] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const fileInput = createRef<any>();

  useEffect(() => {
    if(!isLoading) return;
    setImg1(advImg1);
    setImg2(advImg2);
    setIsLoading(false);
  },[]);

  function handleChangeImage1(e:any) {
    e.preventDefault();
    const file = fileInput.current.files[0];
    const reader = new FileReader();

    if(file){
      const res = reader.readAsBinaryString(file)
      console.log(res);
    }
  }

  async function handleChangeImage2(){
    alert('TODO Change Image2 on DATABASE using base64');
  }

  //---REFATORAR CÓDIGOS--- "i++""
  function renderImg1(){
    if(isLoading){
      return (
        <img src={loadingImg} className="AdvImage" alt="AdvImage" style={{width: "85%"}}/>
      );
    }else{
      return(
        <img src={img2} className="AdvImage" alt="AdvImage" style={{width: "85%"}}/>
      );
    }
  }

  function renderImg2(){
    if(isLoading){
      return (
        <img src={loadingImg} className="AdvImage" alt="AdvImage" style={{width: "85%"}}/> 
      );
    }else{
      return (
        <img src={img1} className="AdvImage" alt="AdvImage" style={{width: "85%"}}/>
      );
    }
  }

  return(
    <div id="page-control-map">
      <Sidebar />
      <main>
        <div className="control-map">

          <div className="text">
            <h1>Pagina Inicial</h1>
          </div>
            <h2 className="imagesText">Imagens renderizadas no aplicativo <img src={logoImg} className="landingImg" alt="CompreMaisAki" /></h2>
          <div className="advRow">
            <div className="advCol">
              <label>Imagem 1:</label>
              {renderImg1()}
              
              <div className="button-block">
              <input type='file' ref={fileInput} className='changeImageButton' onChange={e => handleChangeImage1(e)} />
              </div>
            </div>
            <div className="advCol">
              <label>Imagem 2:</label>
              {renderImg2()}
              
              <div className="button-block">
                <button type="button" onClick={() => handleChangeImage2()} className="changeImageButton">
                  <FaExchangeAlt size="26" color="#fff" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default ControlMap;