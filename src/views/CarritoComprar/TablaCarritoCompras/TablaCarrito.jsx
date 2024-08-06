import React from 'react';
import { Layout } from '../../../components/Layout';
import { DetallePedidos } from "../CardDetallePedido";
import { Footer } from '../../../components/Footer';

export const TablaCarrito = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Layout />
      <div className="flex-grow">
        <DetallePedidos />
      </div>
      <Footer />
    </div>
  );
};
