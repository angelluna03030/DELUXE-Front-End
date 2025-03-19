import { useState, useContext } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input
} from "@nextui-org/react";
import { toast } from 'react-toastify';
import { CarritoContext } from '../../../states/context/ContextCarrito';
import { Colores } from '../../Productos.modulo/components/DataColores';
import {Departamentos} from "./Data";
import {validarCorreo, validarNombre, validartelefono} from "./Validaciones"
import { Link } from 'react-router-dom';
export const BotonHacerPedido = () => {
  const { carrito, vaciarCarrito, calcularTotal } = useContext(CarritoContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    direccion: '',
    ciudad: '',
    aceptaTerminos: false,
  });
  const obtenerNombreColor = (colorHex: string) => {
    const colorEncontrado = Colores.find(c => c.color === colorHex);
    return colorEncontrado ? colorEncontrado.label : colorHex;
  };

  const transformarCarrito = (carrito: any[]) => {
    return carrito.map(item => ({
      nombre_producto: item.nombre,
      talla: item.talla,
      color: obtenerNombreColor(item.color), // Usa el nombre en lugar del valor hexadecimal
      precio: item.precio,
      cantidad: item.cantidad,
    }));
  };

  const detalle_venta = transformarCarrito(carrito);
  const total = calcularTotal();


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  const generarMensaje = () => {
    let mensaje =
      `Quiero hacer este pedido en Deluxe Uniformes: ========================\n
     
- Nombre: ${formData.nombre}
- Correo: ${formData.correo}
- Dirección: ${formData.direccion}
- Ciudad: ${formData.ciudad} \n`;

    detalle_venta.forEach((item: { cantidad: any; nombre_producto: any; talla: any; color: any; precio: { toLocaleString: () => any; }; }) => {
      mensaje += `- ${item.cantidad} *${item.nombre_producto}* - Talla: ${item.talla}, Color: ${item.color}, / _$ ${item.precio.toLocaleString()}_\n`;
    });

    mensaje += `========================\nTOTAL: *$ ${total.toLocaleString()}*\n========================\n`;

    return mensaje;
  };

  const enviarMensaje = () => {
    if (!formData.nombre || !formData.correo || !formData.direccion || !formData.ciudad || !formData.aceptaTerminos) {
      toast.warn('Por favor complete todos los campos y acepte los términos y condiciones.');
      return;
    }
    
    const numero = '3017996301';
    const mensaje = encodeURIComponent(generarMensaje());
    const urlWhatsApp = `https://wa.me/57${numero}?text=${mensaje}`;
    window.open(urlWhatsApp, '_blank');
    vaciarCarrito();
    onClose();
  };

  return (
    <>
      <div className='flex justify-around items-center py-3 cursor-pointer w-48 rounded-lg m-auto bg-black text-white'>
        <button className='font-semibold text-sm text-green-700' onClick={onOpen}>Pedir Ahora</button>
      </div>
      
      <Modal backdrop='blur' isOpen={isOpen} onClose={onClose} size='lg'>
        <ModalContent>
          <ModalHeader>
            <h3>Datos del Cliente</h3>
          </ModalHeader>
          <ModalBody>
            <Input label='Nombre' name='nombre' value={formData.nombre} onChange={handleChange} required />
            <Input label='Correo' type='email' name='correo' value={formData.correo} onChange={handleChange} required />
            <Input label='Dirección' name='direccion' value={formData.direccion} onChange={handleChange} required />
            <Input label='Ciudad' name='ciudad' value={formData.ciudad} onChange={handleChange} required />
          <div className='flex'>
          <Checkbox name='aceptaTerminos' isSelected={formData.aceptaTerminos} onChange={handleChange}>
</Checkbox>
            <Link 
  to={"/terminosycondiciones"} 
  className="cursor-pointer text-blue-500 hover:text-blue-700 underline"
>
  Acepto los términos y condiciones
</Link>
          </div>
        
          </ModalBody>
          <ModalFooter>
            <Button color='danger' onPress={onClose}>Cancelar</Button>
            <Button color='primary' onPress={enviarMensaje}>Confirmar Pedido</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
