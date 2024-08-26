import React from 'react';
import imagen_No_funtion from '../../assets/no-fotos.png';

const RUTA_API = import.meta.env.VITE_API_URL;
export const Productos = ({ alt, src }) => {
  return (
    <div>
      <img
        className='rounded-md'
        src={`${RUTA_API}/public/${src}`}
        alt={alt}
        onError={e => {
          e.target.src = imagen_No_funtion;
        }}
      />
    </div>
  );
};
