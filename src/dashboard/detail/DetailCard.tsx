import * as React from 'react';

interface DetailCardProps {
  title: string;
  value: string | number;
  icon: string; 
  bgColor1: string;
  bgColor2: string;
}

export default function DetailCard({ title, value, icon, bgColor1, bgColor2 }: DetailCardProps) {
  return (
    <div className='detailCard' style={{background: `linear-gradient(to right, ${bgColor1}, ${bgColor2})`}}>
        <div style={{textAlign:'left'}}>
            <img src={icon} alt="detialId"></img>
        </div>
        <div style={{textAlign:'left', margin: '10px 0'}}>{value}</div>
        <div style={{textAlign:'right'}} className='detail-card-value'>{title}</div>
    </div>
  );
}   