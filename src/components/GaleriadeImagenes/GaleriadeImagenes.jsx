import React from 'react';
import { Productos } from './index';
import imagen from '../../assets/OIP.jpg';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { EffectCoverflow } from 'swiper/modules';
import imagen1 from '../../assets/imagen1.jpeg';
import imagen2 from '../../assets/imagen2.jpeg';
import imagen3 from '../../assets/imagen3.jpeg';
import imagen4 from '../../assets/imagen4.jpeg';

export const GaleriaImagenes = () => {
  const productos = [
    { src: imagen, alt: 'Producto 1' },
    { src: imagen1, alt: 'Producto 2' },
    { src: imagen3, alt: 'Producto 3' },
    { src: imagen2, alt: 'Producto 4' },
    { src: imagen4, alt: 'Producto 5' },
  
  ];

  return (
    <div className='flex justify-center items-center  md:ml-12 md:mb-12'>
      <Swiper
        modules={[EffectCoverflow]}
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true} // Habilitar el bucle para que las imágenes se repitan
        slidesPerView={3} // Mostrar solo 3 diapositivas a la vez
        spaceBetween={30} // Espacio entre las diapositivas
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 3,
          slideShadows: false,
        }}
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 3 },
        }}
        className=''
      >
        {productos.map((producto, index) => (
          <SwiperSlide key={index} className='flex items-center md:ml-2 mb-10  md:mb-16'>
            <Productos
              src={producto.src}
              alt={producto.alt}
              className='rounded-lg'
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
