// src/components/Categorias.js
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import imagen from '../../assets/OIP.jpg';
import imagen1 from '../../assets/imagen1.jpeg';
import imagen2 from '../../assets/imagen2.jpeg';
import imagen3 from '../../assets/imagen3.jpeg';
import imagen4 from '../../assets/imagen4.jpeg';


export const Categorias = () => {
  const categories = [
    { id: 1, name: 'Categoría 1', image: imagen },
    { id: 2, name: 'Categoría 2', image: imagen1 },
    { id: 3, name: 'Categoría 3', image: imagen2 },
    { id: 4, name: 'Categoría 4', image: imagen3 },
    { id: 5, name: 'Categoría 5', image: imagen4 },
  
    // Agrega más categorías según sea necesario
  ];

  return (
    <div className='my-10 mx-5'>
      <Swiper
        spaceBetween={10}
        slidesPerView={2}
        breakpoints={{
          640: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 40,
          },
        }}
        className='ml-2 md:ml-0'
        pagination={{ clickable: true }}
      >
        {categories.map(category => (
          <SwiperSlide key={category.id}>
            <div className='w-28 h-44 '>
              <img
                src={category.image}
                alt={category.name}
                className='rounded-2xl w-full h-full object-cover'
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
