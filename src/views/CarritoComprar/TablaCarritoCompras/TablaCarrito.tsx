
import { DetallePedidos } from '../CardDetallePedido';
import { Footer } from '../../../components/Footer';
import { TablaInformacionProductoPedido } from './index';
import { HeaderNegros } from '../../../components/Header';
import { IconWhastApp } from '../../../components/WhatsApp';
export const TablaCarrito = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <HeaderNegros />
        <DetallePedidos />
      <div className='flex flex-col flex-grow justify-end sm:mt-4'>
      <TablaInformacionProductoPedido />
        <Footer />
      </div>
            <IconWhastApp></IconWhastApp>
    </div>
  );
};
