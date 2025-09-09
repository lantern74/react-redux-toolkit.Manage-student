import * as React from 'react';
import { useNavigate } from "react-router-dom";
import VectorIcon from '../../../public/image/vector.svg'

export default function DetailHeader() {
  const navigate = useNavigate();
  return (
    <div className='detail-header'>
        <div>
            <img src={VectorIcon} alt='Back to dashboard' style={{cursor:'pointer'}} onClick={() => navigate('/dashboard')}></img>
        </div>
    </div>
  );
}