import { useState, useEffect } from 'react';
import imagen_No_funtion from "../../assets/no-fotos.png"
import imagen from '../../assets/OIP.jpg';
import imagen1 from '../../assets/imagen1.jpeg';
import imagen2 from '../../assets/imagen2.jpeg';
import imagen3 from '../../assets/imagen3.jpeg';
import imagen4 from '../../assets/imagen4.jpeg';

const productos = [
  { src: imagen, alt: 'Producto 1' },
  { src: imagen1, alt: 'Producto 2' },
  { src: imagen2, alt: 'Producto 3' },
  { src: imagen3, alt: 'Producto 4' },
  { src: imagen4, alt: 'Producto 5' },

  { src: imagen, alt: 'Producto 9' },
];

export const Carrusel = () => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleAnimation = () => {
      setOffset(prevOffset => (prevOffset >= 100 ? 0 : prevOffset + 0.1));
    };

    const intervalId = setInterval(handleAnimation, 20); // Ajusta el valor para la velocidad deseada

    return () => clearInterval(intervalId);
  }, []);

  const containerStyle = {
    display: 'flex',
    transition: 'transform 0.1s linear',
    transform: `translateX(-${offset}%)`,
    width: `${productos.length * 100}%`,
  };

  return (
    <div className='overflow-hidden rounded-lg shadow-md relative h-96 w-80 mx-auto mt-10'>
      <div className='flex' style={containerStyle}>
        {productos.map((producto, index) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            key={index}
            className='w-full'
            style={{ minWidth: `${100 / productos.length}%` }}
          >
            <img
               onError={e => {
                e.target.src = imagen_No_funtion;
              }}
              src={producto.src}
              alt={producto.alt}
              className='w-[100%] h-full object-cover '
            />
          </div>
        ))}
      </div>
    </div>
  );
};
