import React, { useState, useEffect } from 'react';
import { FiSend } from 'react-icons/fi';
import api from '../services/api';

export default function Validation({validate, productId, userToken, promoName}:any){
  const [validateProto, setValidateProto] = useState(`${validate}`);
  const [promo_name] = useState(`${promoName}`)
  const [user_token] = useState(`${userToken}`);
  const [product_id] = useState(`${productId}`);
  
  function handleSend(){
    api.put(`products/${product_id}`,{
      validade: validateProto,
      is_active: 1,
    },{
      headers: {'Authorization': 'Bearer '+user_token}
    }).then(res => {
      alert(`Validade da Promoção ${promoName} alterada.`);
    }).catch(err => {
      alert(err);
    })
  }

  function handleSetValidate(event:string){
    setValidateProto(event);
  }

  return(
    <div className="validation-row">
      <input className="validate-input" type="date" value={validateProto} onChange={event => handleSetValidate(event.target.value)} />
      <button className="aprove" onClick={() => handleSend()}>
        <FiSend size="13" color="#FFF" />
      </button>
    </div>
  );
}