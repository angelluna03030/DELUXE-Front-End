import React from 'react';
import imagen from '../../assets/OIP.jpg';
import imagen_No_funtion from '../../assets/no-fotos.png';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
const RUTA_API = import.meta.env.VITE_API_URL;

export const Producto = ({Ids}) => {
  const [Producto, setProducto] = useState({
    nombreproductos: '',
    estado: 1,
    precio: 0,
    descripcion: '',
    tallas: [],
    colores: [],
    imagenes: [],
    categorias: [],
  });

  useEffect(() => {
    const obtenerCatalogo = async () => {
      try {
        const response = await fetch(`${RUTA_API}/public`, {
          method: 'POST',
          body: Ids,
        });
  
        if (respuesta.ok) {
          const data = await respuesta.json();
          if (data.length > 0) {
            // Asumiendo que solo hay un catálogo
            setProducto(data[0]); 
          } else {
            toast.error('No se encontraron recursos');
          }
       
        } else {
          toast.error('No se encontraron los recursos (404)');
          console.error('Error al obtener el catálogo:', respuesta.status);
        }
      } catch (err) {
        toast.error('No se ha podido traer el catálogo');
        console.error('Error al traer el catálogo:', err);
      }
    };

    obtenerCatalogo();
  }, []); // Se ejecuta solo una vez cuando el componente se monta.

  return (
    <div className='container mx-auto p-4 lg:min-h-screen flex items-center justify-center'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {/* Producto 1 */}
        <div className='max-w-xs sm:max-w-sm mx-auto relative shadow-md rounded-lg cursor-pointer'>
          <img
            onError={e => {
              e.target.src = imagen_No_funtion;
            }}
            src={imagen}
            alt='Img by Meriç Dağlı https://unsplash.com/@meric'
            className='w-full h-auto object-cover rounded-lg'
          />
          <div className='absolute bottom-0 left-0 right-0 h-36 sm:h-40 bg-black bg-opacity-50 backdrop-blur text-white p-4 rounded-b-lg'>
            <h1 className='text-lg sm:text-2xl font-semibold'>Producto #1</h1>
            <p className='mt-1 sm:mt-2'>
              This is a beautiful nature image placeholder. You can replace it
              with your own image.
            </p>
          </div>
        </div>

        {/* Producto 2 */}
        <div className='max-w-xs sm:max-w-sm mx-auto relative shadow-md rounded-lg cursor-pointer'>
          <img
            src={imagen}
            alt='Img by Meriç Dağlı https://unsplash.com/@meric'
            className='w-full h-auto object-cover rounded-lg'
          />
          <div className='absolute bottom-0 left-0 right-0 h-36 sm:h-40 bg-black bg-opacity-50 backdrop-blur text-white p-4 rounded-b-lg'>
            <h1 className='text-lg sm:text-2xl font-semibold'>Producto #1</h1>
            <p className='mt-1 sm:mt-2'>
              This is a beautiful nature image placeholder. You can replace it
              with your own image.
            </p>
          </div>
        </div>

        {/* Producto 3 */}
        <div className='max-w-xs sm:max-w-sm mx-auto relative shadow-md rounded-lg cursor-pointer'>
          <img
            src={imagen}
            alt='Img by Meriç Dağlı https://unsplash.com/@meric'
            className='w-full h-auto object-cover rounded-lg'
          />
          <div className='absolute bottom-0 left-0 right-0 h-36 sm:h-40 bg-black bg-opacity-50 backdrop-blur text-white p-4 rounded-b-lg'>
            <h1 className='text-lg sm:text-2xl font-semibold'>Producto #1</h1>
            <p className='mt-1 sm:mt-2'>
              This is a beautiful nature image placeholder. You can replace it
              with your own image.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
