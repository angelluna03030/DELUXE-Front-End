
import { DetallePedidos } from '../CardDetallePedido';
import { Footer } from '../../../components/Footer';
import { TablaInformacionProductoPedido } from './index';
import { HeaderNegros } from '../../../components/Header';
export const TablaCarrito = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <HeaderNegros />
      <TablaInformacionProductoPedido />
      <div className='flex flex-col flex-grow justify-end sm:mt-10'>
        <DetallePedidos />
        <Footer />
      </div>
    </div>
  );
};
