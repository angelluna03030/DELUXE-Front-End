import React from 'react';
import imagen_No_funtion from '../../assets/no-fotos.png';

const RUTA_API = import.meta.env.VITE_API_URL;
interface ProductoProps {
  alt: string;
  src: string;
}

export const Productos: React.FC<ProductoProps> = ({ alt, src }) => {
  return (
    <div>
      <img
        loading='lazy'
        className='rounded-md sm:p-10 sm:rounded-2xl'
        src={`${src}`}
        alt={alt}
        onError={e => {
          (e.target as HTMLImageElement).src = imagen_No_funtion;
        }}
      />
    </div>
  );
};
