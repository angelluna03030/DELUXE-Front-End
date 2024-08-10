import React from 'react';
import imagen_No_funtion from "../../assets/no-fotos.png"
export const Productos = ({ alt, src }) => {
  return (
    <div>
      <img className='rounded-md' src={src} alt={alt} 
       onError={e => {
        e.target.src = imagen_No_funtion;
      }}
      />
    </div>
  );
};
