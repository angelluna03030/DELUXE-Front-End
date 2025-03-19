import { Image } from '@nextui-org/react';
import React from 'react';

export const Productos = ({ alt, src }) => {
  return (
    <div>
      <Image className='rounded-md' width={550} src={src} alt={alt} />
    </div>
  );
};
