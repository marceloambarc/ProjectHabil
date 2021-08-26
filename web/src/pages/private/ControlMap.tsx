import React, { useEffect, useState, createRef } from 'react';
import Resizer from "react-image-file-resizer";
import { useHistory } from 'react-router-dom';

import UpperBar from '../../components/UpperBar';
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

  const [isLoadingImage1, setIsLoadingImage1] = useState(false);
  const [isLoadingImage2, setIsLoadingImage2] = useState(false);

  const [isImage1Loaded, setIsImage1Loaded] = useState(true);
  const [isImage2Loaded, setIsImage2Loaded] = useState(true);
  
  const fileInput1 = createRef<any>();
  const fileInput2 = createRef<any>();

  const history = useHistory();

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
      history.push('/login');
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
        200,
        200,
        "PNG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64",
        200,
        200,
      );
    });

  //TAKE THE FILEINPUT
  async function handleChangeImage1(e:any) {
    setIsLoading(true);
    e.preventDefault();
    const file = fileInput1.current?.files[0];
    setIsLoadingImage1(true);
    const image = await resizeFile(file);
    const fileAdaptedRender = String(image).split(',').pop();
    setImg1(fileAdaptedRender? fileAdaptedRender: '');

    setIsLoadingImage1(false);
    setIsLoading(false);
    setIsImage1Loaded(false);
  }

  async function handleChangeImage2(e:any){
    setIsLoading(true);
    e.preventDefault();
    const file = fileInput2.current?.files[0];
    setIsLoadingImage2(true);
    const image = await resizeFile(file);
    const fileAdaptedRender = String(image).split(',').pop();
    console.log(fileAdaptedRender);
    setImg2(fileAdaptedRender? fileAdaptedRender: '');
    
    setIsLoadingImage2(false);
    setIsLoading(false);
    setIsImage2Loaded(false);
  }

  async function handleSendImage1(){
    if(!isImage1Loaded){
      setIsLoadingImage1(true);
      api.put('backgrounds/9',{
        background_image1: `${img1}`
      },{
        headers: {'Authorization': 'Bearer '+userToken}
      }).then(res => {
        setIsLoadingImage1(false);
        setIsImage1Loaded(true);
        alert('Imagem Alterada com Sucesso!')
      }).catch(err => {
        setIsLoadingImage1(false);
        alert('Tivemos um Erro inesperado.');
      });
    }else{
      alert('Altere a Imagem para Fazer Upload.');
    }
  }

  async function handleSendImage2(){
    if(!isImage2Loaded){
      setIsLoadingImage2(true);
      api.put('backgrounds/9',{
        background_image2: `${img2}`
      },{
        headers: {'Authorization': 'Bearer '+userToken}
      }).then(res => {
        setIsLoadingImage2(false);
        setIsImage2Loaded(true);
        alert('Imagem Alterada com Sucesso!')
      }).catch(err => {
        setIsLoadingImage2(false);
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
    if(isLoadingImage1){
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
    if(isLoadingImage2){
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
        <UpperBar role={role} />
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
