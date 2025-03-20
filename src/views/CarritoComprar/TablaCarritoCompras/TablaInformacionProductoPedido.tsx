import { ChangeEvent, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useContext } from 'react';
import { CarritoContext } from '../../../states/context/ContextCarrito';

import { Link } from 'react-router-dom';

import { Colores } from "../../../views/Productos.modulo/components/DataColores"
import { formatearNumero } from '../../../states/function';
import { Image } from '@nextui-org/react';
export const TablaInformacionProductoPedido = () => {
  const { carrito, eliminarProducto, actualizarCantidad }:any = useContext(CarritoContext);

  if (!carrito) {
    return <div>No hay productos en el carrito.</div>;
  }

  // Manejadores para incrementar, decrementar y cambiar cantidad


  const handleChangeCantidad = (e: ChangeEvent<HTMLSelectElement>, producto: { id: any; imagen?: string | undefined; nombre?: string | number | boolean | ReactPortal | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined; cantidad?: string | number | readonly string[] | undefined; precio?: number; talla?: string | number | boolean | ReactPortal | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined; color?: string; }) => {
    const value = Number.parseInt(e.target.value, 10);
    if (!Number.isNaN(value) && value >= 1 && value <= 10) {
      actualizarCantidad(producto.id, value);
    }
  };

  return (
    <div className="m-auto sm:flex sm:flex-wrap items-center justify-center sm:px-32  w-full ">
      {carrito.map((item: { id: Key | null | undefined; imagen: string | undefined; nombre: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; cantidad: string | number | readonly string[] | undefined; precio: number; talla: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; color: string; }) => (
        <div key={item.id} className="sm:m-6 relative overflow-hidden  sm:flex  sm:p-4  w-full border-b border-gray-300">
          {/* Imagen del producto */}
          <Image radius='none' loading='lazy' className="w-32 md:w-40 items-center justify-center m-auto  object-cover mt-3 sm:mr-6 sm:m-10" src={item.imagen} alt="Producto" />

          {/* Información del producto */}
          <div className="flex flex-col sm:flex-grow mt-8 space-y-6 sm:ml-0 ml-20">
            {/* Contenedor de nombre, cantidad y precio */}
            <div className="flex flex-col md:flex-row md:items-center mx-auto w-full gap-4 text-center">
              {/* Nombre */}
              <span className="text-xl font-semibold text-start sm:text-2xl  text-wrap text-black hover:text-[#007EDC] hover:underline hover:cursor-pointer flex-1 sm:w-56">
                <Link to={`/producto/${item.id}`}>{item.nombre}</Link>
              </span>

              {/* Cantidad */}
              <select
                className=" w-16 p-1 border border-gray-300  sm:mx-32 rounded-md text-black"
                value={item.cantidad}
                onChange={(e) => handleChangeCantidad(e, item)}
              >
                {[1, 2, 3, 4].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>

              {/* Precio */}
              <span className="text-xl sm:text-2xl font-semibold text-black sm:ml-auto sm:pr-11 pr-44">${formatearNumero(item.precio)}.00</span>
            </div>

            {/* Talla y botón de remover */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full ">
              <span className="text-lg font-medium text-gray-600">TALLA: {item.talla}</span>

              <button
                onClick={() => eliminarProducto(item.id)}
                className="sm:py-2 sm:px-8 text-[#007EDC] hover:underline sm:ml-auto  sm:pr-11 pr-60 sm:mt-0 mt-4" 
              >
                Remover
              </button>
            </div>

            {/* Color */}
            <div className="flex items-center justify-between w-full">
              <span className="text-lg font-medium text-gray-600">
                COLOR: {Colores.find(c => c.color === item.color)?.label || item.color}
              </span>
            </div>
          </div>

        </div>

      ))}
    </div>

  );
};
