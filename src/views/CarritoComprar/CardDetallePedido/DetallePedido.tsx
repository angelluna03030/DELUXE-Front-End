import { BotonHacerPedido } from './index';
import { useContext } from 'react';
import { CarritoContext } from '../../../states/context/ContextCarrito';
import { formatearNumero } from '../../../states/function';

export const DetallePedidos = () => {
  const { calcularTotal }:any = useContext(CarritoContext);
  const total = calcularTotal();
  const obtenerFechaActual = () => {
    const fecha = new Date();
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11
    const año = fecha.getFullYear();
    return `${dia}/${mes}/${año}`;
  };
  const fechaActual = obtenerFechaActual();

  return (
    <>
      <div className='flex flex-col bg-white w-full h-60 rounded-md py-4 px-6 border-b   m-auto'>
        <h3 className='text-center   text-gray-800 pb-2 font-sans text-4xl font-semibold text-[#1D1D1F]'>
        El total de su bolsa es de  ${total > 0 ? formatearNumero(total) : 0}.00.
        </h3>
        <h3 className=' text-gray-900  m-auto  font-sans text-xl  text-[#1D1D1F]'>
          {total <=350000 ? "El envío y la devolución tendrán un costo." : "Envío gratuito y devoluciones gratuitas."}
        </h3>

        <div className='flex gap-2 text-sm text-gray-500 pb-2  m-auto'>
          <p className=''>Dia del pedido:</p>
          <p>{fechaActual}</p>
        </div>
        <BotonHacerPedido />
   
      </div>
    </>
  );
};
