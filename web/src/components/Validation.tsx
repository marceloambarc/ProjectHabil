import React, { useState, useEffect } from 'react';
import { FiSend } from 'react-icons/fi';
import api from '../services/api';

export default function Validation({validate, productId, userToken, promoName, active}:any){
  const [validateProto, setValidateProto] = useState('');
  const [promo_name] = useState(`${promoName}`)
  const [user_token] = useState(`${userToken}`);
  const [product_id] = useState(`${productId}`);

  useEffect(() => {
    if(active == '1'){
      setValidateProto(validate)
    }else{
      var days = 7;
      var date = new Date();
      var res = date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    
      var data = new Date(res),
        dia = data.getDate().toString().padStart(2, '0'),
        mes = (data.getMonth()+1).toString().padStart(2, '0'),
        ano = data.getFullYear();
        const dateBrPattern = `${ano}-${mes}-${dia}`;
        setValidateProto(dateBrPattern);
    }
  },[]);

  function handleSend(){
    api.put(`products/${product_id}`,{
      validade: validateProto,
      is_active: 1,
    },{
      headers: {'Authorization': 'Bearer '+user_token}
    }).then(res => {
      alert(`Validade da Promoção ${promo_name} alterada.`);
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