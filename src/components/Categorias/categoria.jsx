// src/components/Categorias.js
import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify'; // Asegúrate de importar toast si lo usas
import 'swiper/swiper-bundle.css'; // Importar los estilos de Swiper
import { Skeleton } from '@nextui-org/react';
const RUTA_API = import.meta.env.VITE_API_URL;

export const Categorias = () => {
  const [categories, setCategorias] = useState([]);

  const refreshCategorias = async () => {
    try {
      const response = await fetch(`${RUTA_API}/api/categorias`);
      const dataResponse = await response.json();
      if (response.status >= 200 && response.status < 300) {
        setCategorias(dataResponse);
      } else {
        toast.error('No se encontraron los recursos (404)');
      }
    } catch (err) {
      toast.error('No se ha podido traer las categorias');
      console.error(err);
    }
  };

  useEffect(() => {
    refreshCategorias();
  }, []);

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
        {categories.length > 0 ? (
          categories.map(category => (
            <SwiperSlide key={category._id}>
              <Link to={`/categoria/${category.nombre}`}>
                <div className='w-28 h-52 flex flex-col items-center font-medium justify-between '>
                  <div className='w-full h-44'>
                    <img
                      src={`${RUTA_API}/public/${category.imagen}`}
                      alt={category.nombre}
                      className='rounded-2xl w-full h-full object-cover'
                    />
                  </div>
                  <span className='text-gray-800 text-sm mb-0'>
                    {category.nombre}
                  </span>
                </div>
              </Link>
            </SwiperSlide>
          ))
        ) : (
          <div className='flex'>
            <Skeleton className='rounded-lg w-40 h-44 sm:m-5 '></Skeleton>
            <Skeleton className='rounded-lg w-40 h-44 sm:m-5 ml-5'></Skeleton>
            <Skeleton className='rounded-lg w-40 h-44 sm:m-5 ml-5'></Skeleton>
      

          </div>
        )}
      </Swiper>
    </div>
  );
};
