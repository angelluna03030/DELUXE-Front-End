
import { GaleriaImagenes } from '../../components/GaleriadeImagenes';
import { useEffect, useState } from 'react';


import { Productos } from '../../components/Producto';
import { Footer } from '../../components/Footer';
import {Categorias} from "../../components/Categorias"
import { toast } from 'react-toastify';
import { getData } from '../../config/utils/metodoFecht';
import { IconWhastApp } from "../../components/WhatsApp"
import { HeaderMovimiento } from '../../components/Header/Header_movimineto';
import { BentoGallery } from '../../components/EstiloBento';
import { CatalogoPagina } from "../../states/models/ModelsProductos"
import { Layout } from '../../components/Header';
import { Favoritos } from '../../components/Boton/BotonFavoritos';


const RUTA_API = import.meta.env.VITE_API_URL;
export const Catalogo = () => {
  const [catalogo, setCatalogo] = useState<CatalogoPagina>();

  useEffect(() => {
    const obtenerCatalogo = async () => {
      //console.log('Obteniendo catálogo...' , RUTA_API);
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
    <>
      <HeaderMovimiento></HeaderMovimiento>
      <Layout />
      <div className='sm:m-auto mt-5 sm:px-10 sm:mr-16 '>
        <GaleriaImagenes imagenes={catalogo?.imagenesparagaleria} />
      </div>
 
                 <div className="flex justify-center sm:justify-start p-4 sm:p-8">
                      <Favoritos />
                    </div>
      <Categorias />
      
      <BentoGallery imagenes={catalogo?.imagenesparavideo} ></BentoGallery>
      <Productos Ids={catalogo?.productosdestacados} />
      <IconWhastApp></IconWhastApp>
      <Footer />
    </>
  );
};
