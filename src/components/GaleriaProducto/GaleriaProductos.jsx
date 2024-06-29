import React from 'react';
import { Productos } from './index';
import imagen from '../../assets/OIP.jpg';
import imagen1 from '../../assets/imagen1.jpeg';
import imagen2 from '../../assets/imagen2.jpeg';
import imagen3 from '../../assets/imagen3.jpeg';
import imagen4 from '../../assets/imagen4.jpeg';


import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import FlipPage from 'react-flip-page';

export const GaleriaProductos = () => {
    const productos = [
      { src: imagen, alt: 'Producto 1' },
      { src: imagen2, alt: 'Producto 2' },
      { src: imagen1, alt: 'Producto 3' },
      { src: imagen3, alt: 'Producto 4' },
      { src: imagen4, alt: 'Producto 5' },

    ];
  
    return (
      <div className='flex justify-center items-center'>
        <FlipPage
          width={400}
          height={500}
          orientation='horizontal'
          uncutPages
          showSwipeHint
        >
          {productos.map((producto, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
<article key={index} className='flex justify-center items-center rounded-md'>
              <Productos
                src={producto.src}
                alt={producto.alt}
                className='rounded-lg'
              />
            </article>
          ))}
        </FlipPage>
      </div>
    );
  };
  