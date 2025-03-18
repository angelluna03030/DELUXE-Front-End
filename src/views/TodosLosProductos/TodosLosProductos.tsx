
import { Buscador } from '../../components/Inputs';
import { Footer } from '../../components/Footer';

import { CarritoComprasIcono } from '../CarritoComprar/IconoCarritoCompras';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Skeleton } from '@nextui-org/react';
import { TablaVaciaImagen } from '../../components/NoProductos';
import { getData } from '../../config/utils/metodoFecht';
import {IconWhastApp} from "../../components/WhatsApp"
import {  HeaderNegros} from '../../components/Header';
import { Producto } from '@/states/models/ModelsProductos';
import { toast } from 'react-toastify';
import imagen_No_funtion from '../../assets/no-fotos.png';

import {ColorDetalles} from "../../components/Color/index"
import { formatearNumero } from '../../states/function';

const RUTA_API = import.meta.env.VITE_API_URL;

export const TodosLosProductos = () => {
  const { query } = useParams();
  const [productos, setProductos] = useState<Producto[]>([]);

  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState(null);

  const [loading, setLoading] = useState(true); // Estado para controlar el estado de carga
  const handleSelectColor = (color: any) => {
    setSelectedColor(color);
  };
  useEffect(() => {
    const loadProductos = async () => {
      setLoading(true); // Inicia la carga
      try {
        const { status, dataResponse } = await getData(
          `${RUTA_API}/api/productos`,
        );

        if (status >= 200 && status < 300) {
          // Filtra los productos cuyo estado no es 0
          const productosFiltrados = dataResponse.filter(
            (            producto: { estado: number; }) => producto.estado !== 0,
          );
          setProductos(productosFiltrados);
        } else {
          toast.error('Error al cargar los productos');
          console.error('Error al cargar los productos:', status);
        }
      } catch (error) {
        toast.error('Error al cargar los productos');
        console.error('Error cargando los productos:', error);
      } finally {
        setLoading(false); // Termina la carga
      }
    };

    loadProductos();
  }, [query]); // Agrega `query` como dependencia

  return (
    <>
      <HeaderNegros />
     
      <IconWhastApp></IconWhastApp>
      <Buscador />
      <div className='flex min-h-screen  '>
        <div>
          {loading ? ( // Mostrar Skeleton mientras se cargan los productos
           <div className=' container sm:mr-72  mx-auto p-4 lg:min-h-screen flex items-center  justify-center'>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
           <Skeleton className='rounded-lg w-80 h-96  m-2' />
           <Skeleton className='rounded-lg w-80 h-96  m-2' />
           <Skeleton className='rounded-lg w-80 h-96  m-2' />
           <Skeleton className='rounded-lg w-80 h-96  m-2' />
           <Skeleton className='rounded-lg w-80 h-96  m-2' />
           <Skeleton className='rounded-lg w-80 h-96  m-2' /> <Skeleton className='rounded-lg w-80 h-96  m-2' />
           <Skeleton className='rounded-lg w-80 h-96  m-2' />
           <Skeleton className='rounded-lg w-80 h-96  m-2' />
            </div>
         </div>
          ) : productos.length > 0 ? (
            <div className="container sm:mr-20 mx-auto p-4 lg:min-h-screen flex items-center  justify-center">
      <div className="grid grid-cols-1 sm:ml-20 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {productos.map((producto) => (
          <Link to={`/producto/${producto._id}`} key={producto._id}>
            <div
              className="max-w-xs sm:max-w-sm mx-auto cursor-pointer"
              onMouseEnter={() => setHoveredProduct(producto._id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="overflow-hidden ">
                <img
                loading='lazy'
                  onError={(event) => {
                    const imgElement = event.target as HTMLImageElement;
                    imgElement.src = imagen_No_funtion;
                  }}
                  src={
                    hoveredProduct === producto._id && producto.imagenes[1]
                      ? producto.imagenes[1]
                      : producto.imagenes[0] || imagen_No_funtion
                  }
                  alt={producto.nombreproductos}
                  className="w-full h-auto object-cover transition-opacity duration-700 ease-in-out transition-transform duration-700 ease-in-out hover:scale-105"
                />

              </div>

              <div className="bottom-0 z-10 left-0 right-0 h-36 sm:h-40 py-2 justify-start">
                <h1 className="mt-1 sm:mt-2 text-lg sm:text-xl ">{producto.nombreproductos}</h1>
                <p className="mt-1 sm:mt-2 text-lg sm:text-xl ">${formatearNumero(producto.precio) + ".00 COP" || 'Precio no disponible.'}</p>

                <p className="mt-1 sm:mt-2 flex">
                  {producto.colores.slice(0, 4).map((color) => (
                    <ColorDetalles
                      key={color}
                      color={color}
                      isSelected={selectedColor === color}
                      onSelect={handleSelectColor}
                    />
                  ))}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
          ) : (
        
              <TablaVaciaImagen />
       
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};
