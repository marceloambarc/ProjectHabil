import React from 'react';

import Sidebar from '../../components/Sidebar'

import '../../styles/pages/controlmap.css';

function Companies(){
  return(
    <div id="page-control-map">
      <Sidebar />
      <main>
        <div className="control-map">
      
          <div className="text">
            <h1>Company List</h1>
            <p>Alpha Test 0.0.3</p>
            <p>Lista de Empresas</p>
          </div>

        </div>
      </main>
    </div>
  );
}

export default Companies;