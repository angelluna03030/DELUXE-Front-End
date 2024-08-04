import { Layout } from '../../components/Layout';
import { Buscador } from '../../components/Inputs';
import { Footer } from '../../components/Footer';
import { CardCategoria } from '../../components/Card';
import { CarritoComprasIcono } from "../CarritoComprar/IconoCarritoCompras";
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';

const RUTA_API = import.meta.env.VITE_API_URL;

export const Categoria = () => {
  const { categoria } = useParams();
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const loadProductos = async () => {
      try {
        const response = await fetch(`${RUTA_API}/api/productos/categorias/${categoria}`);
        const data = await response.json();
        setProductos(data);
      } catch (error) {
        console.error('Error cargando los productos:', error);
      }
    };

    loadProductos();
  }, []);

  return (
    <>
      <Layout />
      <CarritoComprasIcono />
      <Buscador />
      <div className='flex min-h-screen items-center justify-center px-2'>
        <div>
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
        </div>
      </div>
      <Footer />
    </>
  );
};
