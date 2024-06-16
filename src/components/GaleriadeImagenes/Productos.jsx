import React from 'react';
import { Image } from '@nextui-org/react';
export const Productos = ({alt, src}) => {
  return (
    <div className=''>
      <img
        className='rounded-md'
        width={350}
        src={src}
        alt={alt}
     
      />
    </div>
  );
};
