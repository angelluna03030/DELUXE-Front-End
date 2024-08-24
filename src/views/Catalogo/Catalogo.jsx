import { Layout } from '../../components/Layout';
import { Buscador } from '../../components/Inputs';
import { GaleriaImagenes } from '../../components/GaleriadeImagenes';
import React, { useEffect, useState } from 'react';
import { Carrusel } from '../../components/CaruselImagenes';
import { VideoPlayer } from '../../components/Video';
import { Producto } from '../../components/Producto';
import { Footer } from '../../components/Footer';
import { Categorias } from '../../components/Categorias';
import { CarritoComprasIcono } from '../CarritoComprar/IconoCarritoCompras';
const RUTA_API = import.meta.env.VITE_API_URL;
export const Catalogo = () => {
  const [catalogo, setCatalogo] = useState({
    imagenesparavideo: [],
    video: '',
    imagenesparagaleria: [],
    productosdestacados: [],
  });

  useEffect(() => {
    const obtenerCatalogo = async () => {
      try {
        const respuesta = await fetch(`${RUTA_API}/api/catalogo`);
        
        if (respuesta.ok) {
          const data = await respuesta.json();
          if (data.length > 0) {
            // Asumiendo que solo hay un catálogo
            setCatalogo(data[0]); 
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
    <>
      <Layout />
      <Buscador />
      <Carrusel imagenes={catalogo.imagenesparagaleria} />
      <Categorias />
      <VideoPlayer video={catalogo.video} />

      <GaleriaImagenes imagenes={catalogo.imagenesparagaleria} />
      <Producto Ids={catalogo.productosdestacados}/>
      <CarritoComprasIcono />
      <Footer />
    </>
  );
};
