import { Layout } from '../../components/Layout';

import { VideoPlayer } from '../../components/video';
import { Producto } from '../../components/producto';
import { Footer } from '../../components/Footer';
export const Catalogo = () => {
  return (
    <>
      <Layout />
      <VideoPlayer />
      <Producto />

      <Footer />
    </>
  );
};
