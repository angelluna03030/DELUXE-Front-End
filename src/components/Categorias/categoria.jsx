// src/components/Categorias.js
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import imageUrl from '../../assets/OIP.jpg';

export const Categorias = () => {
  const categories = [
    { id: 1, name: 'Categoría 1', image: imageUrl },
    { id: 2, name: 'Categoría 2', image: imageUrl },
    { id: 3, name: 'Categoría 3', image: imageUrl },
    { id: 4, name: 'Categoría 4', image: imageUrl },
    { id: 5, name: 'Categoría 5', image: imageUrl },
    { id: 6, name: 'Categoría 5', image: imageUrl },
    { id: 7, name: 'Categoría 5', image: imageUrl },
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
