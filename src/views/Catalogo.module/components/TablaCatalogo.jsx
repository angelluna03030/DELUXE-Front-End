import { Layout } from '../../../components/Layout';
import { Carrusel } from '../../../components/CaruselImagenes';
import { VideoPlayer } from '../../../components/Video';
import { Producto } from '../../../components/Producto';
import { Categorias } from '../../../components/Categorias';

import { GaleriaImagenes } from '../../../components/GaleriadeImagenes';
import {EditarCatalogo} from "./index"
export const TablaCatalogo = () => {
  return (
    <div className='flex flex-col gap-6'>
      <EditarCatalogo></EditarCatalogo>
      <div className='sm:flex'>
      <Layout />

      </div>
      <Carrusel />
      <Categorias />
      <div className='w-80 h-80 justify-center items-center mb-64 ml-20  sm:ml-96'>
      <VideoPlayer />

      </div>
      <GaleriaImagenes />
      <Producto />
    </div>
  );
};