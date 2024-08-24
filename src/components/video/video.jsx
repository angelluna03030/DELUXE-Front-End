import React from 'react';

const RUTA_API = import.meta.env.VITE_API_URL;

export const VideoPlayer = ({ video }) => {
  console.log(video);

  // Verifica si video tiene un valor válido antes de renderizar
  if (!video) {
    return <p>No se ha proporcionado un video.</p>;
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
