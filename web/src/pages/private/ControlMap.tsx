import React, { useEffect, useState, createRef } from 'react';
import { FaExchangeAlt } from 'react-icons/fa'

import Sidebar from '../../components/Sidebar';
import api from '../../services/api';
import '../../styles/pages/controlmap.css';
import '../../styles/pages/home.css';

import loadingImg from '../../images/loading.gif';
import logoImg from '../../images/cmatextlogo.png';

//SOLICITAR ROTA DE ALTERACAO DE IMAGEM PARA CARREGAMENTO NO APP
function ControlMap(){
  const [img1, setImg1] = useState('');
  const [img2, setImg2] = useState('');
  const [base] = useState('data:image/jpeg;base64');
  const [isLoading, setIsLoading] = useState(true);
  const fileInput = createRef<any>();

  async function getImages(){
    await api.get('backgrounds/9').then(response => {
      setImg1(response.data.background_image1);
      setImg2(response.data.background_image2);
    })
  }

  useEffect(() => {
    if(!isLoading) return;
    getImages();
    setIsLoading(false);
  },[]);
  
    const getBase64 = (file:any) => {
    return new Promise(resolve => {
      let fileInfo;
      let baseURL:any = "";

      //MAKE NEW FILEREADER
      let reader = new FileReader();

      //CONVERT THE FILE TO BASE64 TEXT
      reader.readAsDataURL(file);
      
      //ON READER LOAD SMTHING
      reader.onload = () => {
        //TREAT RADER.RESULT TO STRING
        const base64String = reader.result;
        baseURL = base64String;
        resolve(baseURL);
      };
      console.log(fileInfo);
    });
  }

  //TAKE THE FILEINPUT
  async function handleChangeImage1(e:any) {
    e.preventDefault();
    const file = fileInput1.current?.files[0];

    getBase64(file).then(result => {
      file["base64"] = result;
      let fileAdapted = file.base64;
      setImg1(fileAdapted);
    })
  }

  async function handleChangeImage2(e:any){
    e.preventDefault();
    const file = fileInput2.current.files[0];
    
    getBase64(file).then(result => {
      file["base64"] = result;
      let fileAdapted = file.base64;
      setImg2(fileAdapted);
    })
  }

  //---REFATORAR CÓDIGOS--- "i++""
  function renderImg1(){
    if(isLoading){
      return (
        <img src={loadingImg} className="AdvImage" alt="AdvImage" style={{width: "85%"}}/>
      );
    }else{
      return(
        <img src={base + ',' + img1} className="AdvImage" alt="AdvImage" style={{width: "85%"}}/>
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
        <img src={base + ',' + img2} className="AdvImage" alt="AdvImage" style={{width: "85%"}}/>
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
                <input type='file' name='file' ref={fileInput1} className='changeImageButton' onChange={e => handleChangeImage1(e)} />
              </div>
            </div>
            <div className="advCol">
              <label>Imagem 2:</label>
              {renderImg2()}
              
              <div className="button-block">
                <input type='file' name='file' ref={fileInput2} className='changeImageButton' onChange={e => handleChangeImage2(e)} />
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default ControlMap;
