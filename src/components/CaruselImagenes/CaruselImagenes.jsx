import { useState, useEffect } from 'react';
import imagen_No_funtion from '../../assets/no-fotos.png';
const RUTA_API = import.meta.env.VITE_API_URL;
import { Skeleton } from '@nextui-org/react';
// Componente Carrusel que acepta un array de imágenes como prop
export const Carrusel = ({ imagenes = [] }) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleAnimation = () => {
      setOffset(prevOffset => (prevOffset >= 100 ? 0 : prevOffset + 0.1));
    };

    const intervalId = setInterval(handleAnimation, 20); // Ajusta el valor para la velocidad deseada

    return () => clearInterval(intervalId);
  }, []);

  if (!imagenes.length) {
    return (
      <div className="overflow-hidden rounded-lg shadow-md relative h-96 w-80 mx-auto mt-10">
        <Skeleton className='rounded-lg  sm:m-5  h-96 w-80 m-auto mb-10' />;
      </div>
    );
  }

  const containerStyle = {
    display: 'flex',
    transition: 'transform 0.1s linear',
    transform: `translateX(-${offset}%)`,
    width: `${imagenes.length * 100}%`,
  };

  return (
    <div className='overflow-hidden rounded-lg shadow-md relative h-96 w-80 mx-auto mt-10'>
      <div className='flex' style={containerStyle}>
        {imagenes.map((imagenSrc, index) => (
          <div
            key={index}
            className='w-full'
            style={{ minWidth: `${100 / imagenes.length}%` }}
          >
            <img
              onError={e => {
                e.target.src = imagen_No_funtion;
              }}
              src={`${RUTA_API}/public/${imagenSrc}`}
              alt={`Imagen ${index + 1}`}
              className='w-[100%] h-full object-cover'
            />
          </div>
        ))}
      </div>
    </div>
  );
};

