import React from 'react';
import video from '../../assets/videopromocion.mp4';

export const VideoPlayer = () => {
  return (
    <div className='flex justify-center items-center mt-10 mb-10 bg-gray-100  mr-2 ml-2'>
      <div className='w-full md:max-w-screen-lg '>
        <div className='relative overflow-hidden rounded-lg shadow-lg'>
          <video autoPlay muted loop playsInline className='w-full md:h-auto'>
            <source src={video} type='video/mp4' />
            Tu navegador no soporta la reproducción de videos.
          </video>
        </div>
      </div>
    </div>
  );
};
