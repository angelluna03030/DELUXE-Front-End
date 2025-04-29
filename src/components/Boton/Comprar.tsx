import { Tooltip } from '@nextui-org/react';
import { toast } from 'react-toastify';
import { useState, useEffect, useContext } from 'react';
import { Colores } from '../../views/Productos.modulo/components/DataColores';
import { Producto } from '../../states/models/ModelsProductos';
import { CarritoContext } from '../../states/context/ContextCarrito';
import { useNavigate } from 'react-router-dom';
interface Compras {
  nombre: string;
  precio: number;
  producto: Producto;
  selectedColor: string;
  selectedTalla : string
}
export const Comprar: React.FC<Compras> = ({
  nombre,
  precio,
  producto,
  selectedColor,
  selectedTalla,
}) => {
  const [validar, setValidar] = useState(true);
  const [mensajeTooltip, setMensajeTooltip] = useState('');
  const { agregarProducto }:any = useContext(CarritoContext);
  const navigate = useNavigate();


  const handleComprarProducto = () => {
    if (validar && nombre && precio && selectedColor && selectedTalla) {
      agregarProducto(
        {
          id: producto._id,
          imagen: producto.imagenes[0],
          nombre: producto.nombreproductos,
          precio: producto.precio,
          talla: selectedTalla,
          color: selectedColor,
        },
        1 // Cantidad seleccionada
      );
      toast.success('Listo para la compra');
      setTimeout(() => navigate(`/carritocompras`)); // Pequeño retraso antes de la navegación
    } else {
      toast.error(mensajeTooltip);
    }
  };

  useEffect(() => {
    if (producto && (producto.colores.length === 0 || producto.tallas.length === 0)) {
      setMensajeTooltip('Este producto no tiene opciones de talla ni color.');
      setValidar(true);
    } else if (!nombre || !precio) {
      setMensajeTooltip('El producto debe tener un nombre y un precio.');
      setValidar(false);
    } else if (!selectedColor && producto.colores.length > 0) {
      setMensajeTooltip('Elige Color para continuar con tu compra.');
      setValidar(false);
    } else if (!selectedTalla && producto.tallas.length > 0) {
      setMensajeTooltip('Elige Talla para continuar con tu compra.');
      setValidar(false);
    } else {
      setMensajeTooltip('');
      setValidar(true);
    }
  }, [selectedColor, selectedTalla, producto, nombre, precio]);

  return (
    <Tooltip
    isDisabled={validar}
    content={mensajeTooltip}
    showArrow
    placement='top-start'
    classNames={{
      base: [
        // arrow color
        'before:bg-neutral-400 dark:before:bg-white',
      ],
      content: ['py-2 px-4 shadow-xl bg-[#358FED]', 'text-white'],
    }}
  >
      <div className='bg-colorprimary rounded-full m-3 p-4  text-white w-40 justify-items-center text-center'>
        <button
          type='button'
          onClick={handleComprarProducto}
          className='  sm:mt-0 mt-2'
        >
          Comprar
        </button>
      </div>
    </Tooltip>
  );
};
