import React from 'react';

export const Productos = ({ alt, src }) => {
  return (
    <div>
      <img className='rounded-md' src={src} alt={alt} />
    </div>
  );
};
