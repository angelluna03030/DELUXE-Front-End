import { useState, useEffect } from 'react';
import imagen from '../../assets/OIP.jpg';

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

export const Carrusel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === productos.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000); // Intervalo de 3 segundos para cambiar de imagen

    return () => clearInterval(interval); // Limpiar el intervalo al desmontar el componente
  }, []);

  // Utilizamos un estilo inline para mover el carrusel hacia la derecha
  const containerStyle = {
    display: 'flex',
    transition: 'transform 1s ease',
    transform: `translateX(-${currentIndex * (100 / productos.length)}%)`, // Mover hacia la derecha
    width: `${productos.length * 100}%`, // Ajustar el ancho del contenedor
  };

  return (
    <div className="overflow-hidden rounded-lg shadow-md relative h-96 w-80 mx-auto mt-10">
      <div className="flex" style={containerStyle}>
        {productos.map((producto, index) => (
          <div
            key={index}
            className="w-full"
            style={{ minWidth: `${100 / productos.length}%` }}
          >
            <img
              src={producto.src}
              alt={producto.alt}
              className="w-[100%] h-full object-cover "
            />
          </div>
        ))}
      </div>
    </div>
  );
};
