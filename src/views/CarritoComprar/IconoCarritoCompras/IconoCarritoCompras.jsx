import React from 'react';
import IconoCarritoCompras from "../../../assets/carrito.svg";
import { Link } from 'react-router-dom';

export const CarritoComprasIcono = () => {
    const hola = false ;
    return (
        <>
        <Link>
        <div className="fixed bottom-4 left-4 bg-white rounded-full sm:w-16 sm:h-16 flex items-center justify-center shadow-2xl hover:bg-white transition duration-300 w-14 h-14 border-x-slate-100">

        {hola &&(
     <div className='bg-red-400 w-3 h-3 rounded-full  fixed bottom-14 left-14'></div>
        )
         }
            <img src={IconoCarritoCompras} alt="Carrito de Compras" className="sm:w-8 sm:h-8  w-6 h-6 " />
        </div>
        </Link>
        
        </>
    );
};
