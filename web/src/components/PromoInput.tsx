import React, { useState} from 'react';
import { FiSend } from 'react-icons/fi';
import api from '../services/api';

export default function PromoInput({maxProm, companyId, companyName,userToken}:any){
  const [company_id] = useState(companyId);
  const [company_name] = useState(companyName);
  const [maxPromProto, setMaxPromProto] = useState(maxProm);
  const [user_token] = useState(`${userToken}`);
  function handleSetMaxProm(maxProm:any, event:string){
    setMaxPromProto(event);
  }
  async function handleSend(){
    api.put(`companies/${company_id}`,{
      max_prom: maxPromProto,
      is_active: 1,
    },{
      headers: {'Authorization': 'Bearer '+user_token}
    }).then(res => {
      alert(`Limite de Promoções alteradas na empresa ${company_name}`)
    }).catch(err => {
      alert(err);
    });
  }
  return (
    <div className="max-promo-row">
      <div className="max-promo-col">
        <input className="max-promo-input" type="number" value={maxPromProto} onChange={event => handleSetMaxProm(maxProm, event.target.value)} />
      </div>
      <div className="max-promo-col">
          <button className="aprove" onClick={() => handleSend()}>
            <FiSend size="13" color="#FFF" />
          </button>
      </div>
    </div>
  );
}