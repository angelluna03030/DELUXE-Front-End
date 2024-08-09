import React from 'react';
import IconoCarritoCompras from '../../../assets/carrito.svg';
import { Link } from 'react-router-dom';

export const CarritoComprasIcono = () => {
  const hola = true;
  return (
    <>
      <Link to={'/carritocompras'}>
        <div className='z-40 fixed bottom-4 left-4 bg-white rounded-full sm:w-16 sm:h-16 flex items-center justify-center shadow-md hover:bg-white transition duration-300 w-14 h-14 border-x-slate-100 shadow-slate-300'>
          {hola && (
            <div className='bg-red-400 w-3 h-3 rounded-full  fixed bottom-14 left-14 sm:bottom-16 sm:left-16'></div>
          )}
          <img
            src={IconoCarritoCompras}
            alt='Carrito de Compras'
            className='sm:w-8 sm:h-8  w-6 h-6 '
          />
        </div>
      </Link>
    </>
  );
};
