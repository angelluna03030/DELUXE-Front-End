import { Layout } from '../../components/Layout';
import { Buscador } from '../../components/Inputs';
import { GaleriaImagenes } from '../../components/GaleriadeImagenes';

import { Carrusel } from '../../components/CaruselImagenes';
import { VideoPlayer } from '../../components/Video';
import { Producto } from '../../components/Producto';
import { Footer } from '../../components/Footer';
import { Categorias } from '../../components/Categorias';
import {CarritoComprasIcono} from "../CarritoComprar/IconoCarritoCompras"
export const Catalogo = () => {
  return (
    <>
      <Layout />
      <Buscador />
      <Carrusel />
      <Categorias />
      <VideoPlayer />
      <GaleriaImagenes />
      <Producto />
      <CarritoComprasIcono/>
      <Footer />
    </>
  );
};
