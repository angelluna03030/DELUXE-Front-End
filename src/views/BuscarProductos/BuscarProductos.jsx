import { Layout } from '../../components/Layout';
import { Buscador } from '../../components/Inputs';
import { Footer } from '../../components/Footer';
import { CardCategoria } from '../../components/Card';
import { CarritoComprasIcono } from '../CarritoComprar/IconoCarritoCompras';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Skeleton } from '@nextui-org/react';
import { TablaVaciaImagen } from '../../components/NoProductos';

const RUTA_API = import.meta.env.VITE_API_URL;

export const BuscarProductos = () => {
  const { query } = useParams();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para controlar el estado de carga

  useEffect(() => {
    const loadProductos = async () => {
      try {
        setLoading(true); // Inicia la carga
        const response = await fetch(
          `${RUTA_API}/api/productos/buscar/${query}`,
        );
        const data = await response.json();
        const productosFiltrados = data.filter(
          producto => producto.estado !== 0,
        );

        setProductos(productosFiltrados);
      } catch (error) {
        console.error('Error cargando los productos:', error);
      } finally {
        setLoading(false); // Termina la carga
      }
    };

    loadProductos();
  }, [query]); // Agrega `query` como dependencia

  return (
    <>
      <Layout />
      <CarritoComprasIcono />
      <Buscador />
      <div className='flex min-h-screen  px-2'>
        <div>
          {loading ? ( // Mostrar Skeleton mientras se cargan los productos
            <div className=' grid grid-cols-2 gap-6 md:grid-cols-4 mb-10 m-auto'>
              <Skeleton className='rounded-lg w-40 h-52  m-5' />
              <Skeleton className='rounded-lg w-40 h-52 m-5' />
              <Skeleton className='rounded-lg w-40 h-52  m-5' />
              <Skeleton className='rounded-lg w-40 h-52 m-5' />
              <Skeleton className='rounded-lg w-40 h-52  m-5' />
              <Skeleton className='rounded-lg w-40 h-52 m-5' />
              <Skeleton className='rounded-lg w-40 h-52  m-5' />
              <Skeleton className='rounded-lg w-40 h-52 m-5' />
              <Skeleton className='rounded-lg w-40 h-52  m-5' />
              <Skeleton className='rounded-lg w-40 h-52 m-5' />
              <Skeleton className='rounded-lg w-40 h-52  m-5' />
              <Skeleton className='rounded-lg w-40 h-52 m-5' />
            </div>
          ) : productos.length > 0 ? (
            <div className='grid grid-cols-2 gap-6 md:grid-cols-4 mb-10'>
              {productos.map(producto => (
                <CardCategoria
                  key={producto._id}
                  id={producto._id}
                  name={producto.nombreproductos}
                  price={producto.precio}
                  imageSrc={`${RUTA_API}/public/${producto.imagenes[0]}`}
                />
              ))}
            </div>
          ) : (
            <div className="flex justify-center sm:justify-end m-20 sm:w-full sm:mr-96 sm:pl-32">
            <TablaVaciaImagen />
          </div>
          
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};
