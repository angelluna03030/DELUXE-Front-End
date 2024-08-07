import React from 'react';
import { Layout } from '../../../components/Layout';
import { DetallePedidos } from "../CardDetallePedido";
import { Footer } from '../../../components/Footer';

export const TablaCarrito = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Layout />
      <TablaInformacionProductoPedido></TablaInformacionProductoPedido>
      <div className="flex flex-col flex-grow justify-end">
        <DetallePedidos />
        <Footer />
      </div>
    </div>
  );
};
