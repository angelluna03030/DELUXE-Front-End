import React from 'react';
import '../../styles/index.css'; // Asegúrate de importar tu archivo CSS
import { Link } from 'react-router-dom';
import imagen_No_funtion from '../../assets/no-fotos.png';
import { Image } from '@nextui-org/react';
interface CardCategoriaProps {
  name: string;
  price: number;
  imageSrc: string;
  id: string;
}

export const CardCategoria: React.FC<CardCategoriaProps> = ({ name, price, imageSrc, id }) => {
  return (
    <Link to={`/producto/${id}`}>
      <div className='max-w-sm w-48 h-72 bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden transition-transform transform cursor-pointer hover:scale-105 hover:border-gray-300 hover:bg-gray-100'>
        <Image
          loading='lazy'
          className='w-full h-52 object-cover'
          src={imageSrc}
          alt={name}
          onError={() => {
            const imgElement = document.querySelector(`img[alt="${name}"]`) as HTMLImageElement;
            if (imgElement) {
              imgElement.src = imagen_No_funtion;
            }
          }}
        />
        <div className='p-4'>
          <h2 className='text-xl font-semibold mb-1'>{name}</h2>
          <p className='text-gray-600 text-base'>${price}</p>
        </div>
      </div>
    </Link>
  );
};
