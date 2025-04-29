import React from 'react';
import imagen_No_funtion from '../../assets/no-fotos.png';
import { Image } from '@nextui-org/react';

interface ProductoProps {
  alt: string;
  src: string;
}

export const Productos: React.FC<ProductoProps> = ({ alt, src }) => {
  return (
    <div>
      <Image
        loading='lazy'
        className='rounded-md sm:p-10 sm:rounded-2xl'
        
        src={`${src}`}
        alt={alt}
        onError={(e:any)=> {
          (e.target as HTMLImageElement).src = imagen_No_funtion;
        }}
      />
    </div>
  );
};
