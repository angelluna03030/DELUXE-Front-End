import React from 'react';

const RUTA_API = import.meta.env.VITE_API_URL;
import { Skeleton } from '@nextui-org/react';
export const VideoPlayer = ({ video }) => {
  // Verifica si video tiene un valor válido antes de renderizar
  if (!video) {
    return (
      <div className="overflow-hidden rounded-lg shadow-md relative h-96 w-80 mx-auto mt-10">
        <Skeleton className='rounded-lg  sm:m-5  h-96 w-80 m-auto mb-10' />;
      </div>
    );
  }
  // Construye la URL completa para el video
  const videoUrl = `${RUTA_API}/public/${video}`;
  return (
    <div className='flex justify-center items-center mt-10 mb-10 bg-gray-100 mr-2 ml-2'>
      <div className='w-full md:max-w-screen-lg'>
        <div className='relative overflow-hidden rounded-lg shadow-lg'>
          <video
            autoPlay
            muted
            loop
            playsInline
            className='w-full md:h-auto'
            controls // Añadido para los controles del video
            onError={() => console.error('Error al cargar el video')}
          >
            <source src={videoUrl} type='video/mp4' />
            Tu navegador no soporta la reproducción de videos.
          </video>
        </div>
      </div>
    </div>
  );
};
