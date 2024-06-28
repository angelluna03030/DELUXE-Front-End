import React from 'react';
import { Productos } from './index';
import imagen from '../../assets/OIP.jpg';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { EffectCoverflow } from 'swiper/modules';

export const GaleriaImagenes = () => {
  const productos = [
    { src: imagen, alt: 'Producto 1' },
    { src: imagen, alt: 'Producto 2' },
    { src: imagen, alt: 'Producto 3' },
    { src: imagen, alt: 'Producto 4' },
    { src: imagen, alt: 'Producto 5' },
    { src: imagen, alt: 'Producto 6' },
    { src: imagen, alt: 'Producto 7' },
    { src: imagen, alt: 'Producto 8' },
    { src: imagen, alt: 'Producto 9' },
  ];

  return (
    <div className='flex justify-center items-center  ml-2'>
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
          <SwiperSlide key={index} className='flex items-center md:ml-1 mb-10'>
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
