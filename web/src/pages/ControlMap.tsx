import React from 'react';

import Sidebar from '../components/Sidebar'

import '../styles/pages/controlmap.css';

function ControlMap(){
  return(
    <div id="page-control-map">
      <Sidebar />
      <main>
        <div className="control-map">

          <div className="text">
            <h1>Home Page</h1>
            <p>Alpha Test 0.0.3</p>
            <p>Visualizacao gráfica</p>
          </div>

        </div>
      </main>
    </div>
  );
}

export default ControlMap;