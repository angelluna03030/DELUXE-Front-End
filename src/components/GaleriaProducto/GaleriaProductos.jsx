import React, { useState } from 'react';
import imagen from '../../assets/OIP.jpg';
import imagen1 from '../../assets/imagen1.jpeg';
import imagen2 from '../../assets/imagen2.jpeg';
import imagen3 from '../../assets/imagen3.jpeg';
import imagen4 from '../../assets/imagen4.jpeg';
import { Carousel } from "@material-tailwind/react";
export const GaleriaProductos = () => {
  const productos = [
    { original: imagen, alt: 'Producto 1' },
    { original: imagen2, alt: 'Producto 2' },
    { original: imagen1, alt: 'Producto 3' },
    { original: imagen3, alt: 'Producto 4' },
    { original: imagen4, alt: 'Producto 5' },
        { original: imagen4, alt: 'Producto 5' },
  ];

  const [active, setActive] = useState(productos[0].original);

  return (
    <div className='flex justify-center items-center'>
      <div className='w-full max-w-5xl'>
        <div className="grid gap-4">
          <div>
            <img
              className="h-auto w-full max-w-full rounded-lg object-cover object-center md:h-[480px]"
              src={active}
              alt="Active Product"
            />
          </div>
          <div className="grid grid-cols-5 gap-4">
            {productos.map(({ original, alt }, index) => (
              <div  key={index}>
           
                <img
                  onClick={() => setActive(original)}
                  src={original}
                  className="h-20 w-full cursor-pointer rounded-lg object-cover object-center"
                  alt={alt}
                />
           
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
