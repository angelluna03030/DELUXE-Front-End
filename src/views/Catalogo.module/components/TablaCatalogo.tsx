import { useEffect, useState } from 'react';
import { Layout } from '../../../components/Header';
import { Video } from '../../../components/CaruselImagenes';
import { Productos } from '../../../components/Producto';
import { Categorias } from '../../../components/Categorias';
import { toast } from 'react-toastify';
import { GaleriaImagenes } from '../../../components/GaleriadeImagenes';
import { EditarCatalogo } from './index';
import { getData } from '../../../config/utils/metodoFecht';

const RUTA_API = import.meta.env.VITE_API_URL;

export const TablaCatalogo = () => {
  const [catalogo, setCatalogo] = useState({
    imagenesparavideo: [],
    video: '',
    imagenesparagaleria: [],
    productosdestacados: [],
  });

  useEffect(() => {
    const obtenerCatalogo = async () => {
      try {
        const { status, dataResponse } = await getData(
          `${RUTA_API}/api/catalogo`,
        );

        if (status >= 200 && status < 300) {
          if (dataResponse.length > 0) {
            // Asumiendo que solo hay un catálogo
            setCatalogo(dataResponse[0]);
          } else {
            toast.error('No se encontraron recursos');
          }
        } else {
          toast.error('No se encontraron los recursos (404)');
          console.error('Error al obtener el catálogo:', status);
        }
      } catch (err) {
        toast.error('No se ha podido traer el catálogo');
        console.error('Error al traer el catálogo:', err);
      }
    };

    obtenerCatalogo();
  }, []); // Se ejecuta solo una vez cuando el componente se monta.

  return (
    <div className='flex flex-col gap-6'>
      <EditarCatalogo />
      <div className='sm:flex'>
        <Layout />
      </div>
      <Video />
      <Categorias />
      
      <GaleriaImagenes imagenes={catalogo.imagenesparagaleria} />
      <Productos Ids={catalogo.productosdestacados} />
    </div>
  );
};
