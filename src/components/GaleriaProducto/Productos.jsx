import React from 'react';

export const Productos = ({ alt, src }) => {
  return (
    <div className=''>
      <img className='rounded-md' width={550} src={src} alt={alt} />
    </div>
  );
};
