import { useContext } from 'react';
import { CarritoContext } from '../../../states/context/ContextCarrito';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
const RUTA_API = import.meta.env.VITE_API_URL;
import {Colores} from "../../../views/Productos.modulo/components/DataColores"
export const TablaInformacionProductoPedido = () => {
  const { carrito, eliminarProducto, actualizarCantidad } =
    useContext(CarritoContext);

  // Manejadores para incrementar, decrementar y cambiar cantidad
  const handleDecrement = producto => {
    if (producto.cantidad > 1) {
      actualizarCantidad(producto.id, producto.cantidad - 1);
    } else {
      eliminarProducto(producto.id);
    }
  };

  const handleIncrement = producto => {
    if (producto.cantidad < 10) {
      actualizarCantidad(producto.id, producto.cantidad + 1);
    } else {
      toast.warn(
        'Estás haciendo un pedido más allá del límite recomendado que es 10.',
      );
    }
  };

  const handleChangeCantidad = (e, producto) => {
    const value = Number.parseInt(e.target.value, 10);
    if (!Number.isNaN(value) && value >= 1 && value <= 10) {
      actualizarCantidad(producto.id, value);
    }
  };

  return (
    <div className="m-auto flex flex-wrap items-center justify-center border-b border-gray-300">
    {carrito.map((item) => (
      <div key={item.id} className="m-6 relative overflow-hidden w-full flex  p-4  ">
  {/* Imagen del producto */}
  <img className="w-32 md:w-40  object-cover mr-6 sm:m-10" src={item.imagen} alt="Producto" />

  {/* Información del producto */}
  <div className="flex flex-col flex-grow mt-8">
    {/* Contenedor de nombre, cantidad y precio */}
    <div className="flex items-center w-full">
      {/* Nombre */}
      <span className="text-2xl font-semibold text-wrap text-black hover:text-[#007EDC] hover:underline hover:cursor-pointer flex-1 sm:w-56">
        <Link to={`/producto/${item.id}`}>{item.nombre} </Link>
      </span>

      {/* Cantidad */}
      <select
        className="text-center w-16 p-1 border sm:mx-32 border-gray-300 rounded-md text-black "
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
      <span className="text-2xl pl-11 font-semibold text-black ml-auto">${item.precio}.00</span>
    </div>

    {/* Talla y botón de remover */}
    <div className="flex items-center justify-between w-full mt-10">
      <span className="text-lg font-medium text-gray-600">TALLA: {item.talla}</span>
      
      <button
        onClick={() => eliminarProducto(item.id)}
        className="py-2 px-4 text-[#007EDC] hover:underline ml-auto"
      >
        Remover
      </button>
    </div>
    <div className="flex items-center justify-between w-full mt-10">
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
