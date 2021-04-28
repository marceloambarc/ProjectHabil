import React, { useEffect, useState, createRef } from 'react';
import Resizer from "react-image-file-resizer";

import Sidebar from '../../components/Sidebar';
import api from '../../services/api';
import '../../styles/pages/controlmap.css';
import '../../styles/pages/home.css';

import loadingImg from '../../images/loading.gif';
import logoImg from '../../images/cmatextlogo.png';

//SOLICITAR ROTA DE ALTERACAO DE IMAGEM PARA CARREGAMENTO NO APP
function ControlMap(){
  const getUserToken = localStorage.getItem('userToken');

  const [userToken] = useState(`${getUserToken}`)
  const [img1, setImg1] = useState('');
  const [img2, setImg2] = useState('');
  const [base] = useState('data:image/jpeg;base64');
  const [isLoading, setIsLoading] = useState(true);
  const [role, setRole] = useState('');

  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(true);
  
  const fileInput1 = createRef<any>();
  const fileInput2 = createRef<any>();

  async function getImages(){
    await api.get('backgrounds/9').then(response => {
      setImg1(response.data.background_image1);
      setImg2(response.data.background_image2);
    })
  }

  async function getRoles(){
    await api.get('admin/tk',{
      headers: {'Authorization': 'Bearer '+userToken}
    }).then(res => {
      setRole(res.data.role);
    }).catch(res => {
      setRole('guest');
    });
  }

  useEffect(() => {
    if(!isLoading) return;
    getImages();
    getRoles();
    setIsLoading(false);
  },[]);

    const resizeFile = (file:any) =>
    new Promise((resolve:any) => {
      Resizer.imageFileResizer(
        file,
        300,
        300,
        "PNG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });

  //TAKE THE FILEINPUT
  async function handleChangeImage1(e:any) {
    setIsLoading(true);
    e.preventDefault();
    const file = fileInput1.current?.files[0];
    setIsLoadingImage(true);
    const image = await resizeFile(file);
    const fileAdaptedRender = String(image).split(',').pop();
    setImg1(fileAdaptedRender? fileAdaptedRender: '');

    setIsLoadingImage(false);
    setIsLoading(false);
    setIsImageLoaded(false);
  }

  async function handleChangeImage2(e:any){
    setIsLoading(true);
    e.preventDefault();
    const file = fileInput2.current?.files[0];
    setIsLoadingImage(true);
    const image = await resizeFile(file);
    const fileAdaptedRender = String(image).split(',').pop();
    setImg2(fileAdaptedRender? fileAdaptedRender: '');
    
    setIsLoadingImage(false);
    setIsLoading(false);
    setIsImageLoaded(false);
  }

  async function handleSendImage1(){
    if(!isImageLoaded){
      setIsLoadingImage(true);
      api.put('backgrounds/9',{
        background_image1: `${img1}`
      },{
        headers: {'Authorization': 'Bearer '+userToken}
      }).then(res => {
        setIsLoadingImage(false);
        setIsImageLoaded(true);
        alert('Imagem Alterada com Sucesso!')
      }).catch(err => {
        setIsLoadingImage(false);
        alert('Tivemos um Erro inesperado.');
      });
    }else{
      alert('Altere a Imagem para Fazer Upload.');
    }
  }

  async function handleSendImage2(){
    if(!isImageLoaded){
      setIsLoadingImage(true);
      api.put('backgrounds/9',{
        background_image2: `${img2}`
      },{
        headers: {'Authorization': 'Bearer '+userToken}
      }).then(res => {
        setIsLoadingImage(false);
        setIsImageLoaded(true);
        alert('Imagem Alterada com Sucesso!')
      }).catch(err => {
        setIsLoadingImage(false);
        alert('Tivemos um Erro inesperado.');
      });
    }else{
      alert('Altere a Imagem para Fazer Upload.');
    }
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

  function renderUploadButton1(){
    if(isLoadingImage){
      return (
        <button className="loading-image-button">
          Carregando...
        </button>
      );
    }else{
      return (
        <button className="send-image-button" onClick={() => handleSendImage1()}>
          Upload
        </button>
      );
    }
  }

  function renderUploadButton2(){
    if(isLoadingImage){
      return (
        <button className="loading-image-button">
          Carregando...
        </button>
      );
    }else{
      return (
        <button className="send-image-button" onClick={() => handleSendImage2()}>
          Upload
        </button>
      );
    }
  }
  return(
    <div id="page-control-map">
      <Sidebar role={role} />
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
                <div className="image-handle">
                  <input type='file' name='file' ref={fileInput1} className='changeImageButton' onChange={e => handleChangeImage1(e)} />
                  {renderUploadButton1()}
                </div>
              </div>
            </div>
            <div className="advCol">
              <label>Imagem 2:</label>
              {renderImg2()}
              
              <div className="button-block">
                <div className="image-handle">
                  <input type='file' name='file' ref={fileInput2} className='changeImageButton' onChange={e => handleChangeImage2(e)} />
                  {renderUploadButton2()}
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default ControlMap;
