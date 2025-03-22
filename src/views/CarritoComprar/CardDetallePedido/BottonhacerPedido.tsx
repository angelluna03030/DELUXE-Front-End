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
  Input,
  Select,
  SelectItem
} from "@nextui-org/react";
import { toast } from 'react-toastify';
import { CarritoContext } from '../../../states/context/ContextCarrito';
import { Colores } from '../../Productos.modulo/components/DataColores';
import { Departamentos } from "./Data";
import { validarCorreo, validarNombre } from "./Validaciones";
import { Link } from 'react-router-dom';
import {postData} from "../../../config/utils/metodoFecht"
import {UsuariosCompras} from "../../../states/models/ModelsProductos"
const RUTA_API = import.meta.env.VITE_API_URL;
export const BotonHacerPedido = () => {
  const { carrito, vaciarCarrito, calcularTotal } = useContext(CarritoContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [Usuarios, SetUsuarios] = useState<UsuariosCompras>()
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    direccion: '',
    ciudad: '',
    aceptaTerminos: false,
  });

  const [errors, setErrors] = useState({
    nombre: '',
    correo: '',
    direccion: '',
    ciudad: '',
  });

  const obtenerNombreColor = (colorHex: string) => {
    const colorEncontrado = Colores.find(c => c.color === colorHex);
    return colorEncontrado ? colorEncontrado.label : colorHex;
  };
  const transformarCarrito = (carrito: any[]) => {
    return carrito.map(item => ({
      nombre: item.nombre,
      talla: item.talla,
      color: obtenerNombreColor(item.color),
      precio: item.precio,
      cantidad: item.cantidad,
    }));
  };
  
  const detalle_venta = transformarCarrito(carrito);
  const total = calcularTotal();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Validaciones en tiempo real
    if (name === 'nombre') {
      setErrors(prev => ({ ...prev, nombre: validarNombre(value) ? '' : 'Nombre inválido' }));
    } else if (name === 'correo') {
      setErrors(prev => ({ ...prev, correo: validarCorreo(value) ? '' : 'Correo inválido' }));
    } else if (name === 'direccion') {
      setErrors(prev => ({ ...prev, direccion: value ? '' : 'La dirección es obligatoria' }));
    } else if (name === 'ciudad') {
      setErrors(prev => ({ ...prev, ciudad: value ? '' : 'Seleccione un departamento' }));
    }
  };

  const generarMensaje = () => {
    let mensaje =
      `Quiero hacer este pedido en Deluxe Uniformes: ========================\n
     
- Nombre: ${formData.nombre}
- Correo: ${formData.correo}
- Dirección: ${formData.direccion}
- Ciudad: ${formData.ciudad} \n`;

    detalle_venta.forEach((item) => {
      mensaje += `- ${item.cantidad} *${item.nombre}* - Talla: ${item.talla}, Color: ${item.color}, / _$ ${item.precio.toLocaleString()}_\n`;
    });

    mensaje += `========================\nTOTAL: *$ ${total.toLocaleString()}*\n========================\n`;

    return mensaje;
  };

  const enviarMensaje = async () => {
    if (carrito.length === 0) {
      toast.warn('Debe agregar productos al carrito antes de realizar una compra.');
      return;
    }
  
    if (!formData.nombre || !validarNombre(formData.nombre)) {
      setErrors(prev => ({ ...prev, nombre: 'Nombre inválido' }));
      toast.warn('Por favor, ingrese un nombre válido.');
      return;
    }
  
    if (!formData.correo || !validarCorreo(formData.correo)) {
      setErrors(prev => ({ ...prev, correo: 'Correo inválido' }));
      toast.warn('Por favor, ingrese un correo válido.');
      return;
    }
  
    if (!formData.direccion) {
      setErrors(prev => ({ ...prev, direccion: 'La dirección es obligatoria' }));
      toast.warn('Por favor, ingrese su dirección.');
      return;
    }
  
    if (!formData.ciudad) {
      setErrors(prev => ({ ...prev, ciudad: 'Seleccione un departamento' }));
      toast.warn('Por favor, seleccione un departamento.');
      return;
    }
  
    if (!formData.aceptaTerminos) {
      toast.warn('Debe aceptar los términos y condiciones.');
      return;
    }
  
    try {

      const usuarioData = {
        nombre: formData.nombre,
        correo: formData.correo,
        direccion: formData.direccion,
        departamento: formData.ciudad,
        compras: [
          {
            productos: transformarCarrito(carrito), // Asegurarte de que esto sea un array de productos
            totalCompra: total,
          }
        ]
      };
      
  
      console.log('Datos enviados a la API:', usuarioData);
  
      const respuesta = await postData(`${RUTA_API}/api/usuarios`, usuarioData);
  
      if (respuesta.status >= 200 && respuesta.status < 300) {
        const numero = '3017996301';
        const mensaje = encodeURIComponent(generarMensaje());
        const urlWhatsApp = `https://wa.me/57${numero}?text=${mensaje}`;
        window.open(urlWhatsApp, '_blank');
  
        vaciarCarrito();
        onClose();
      } else {
        toast.error(respuesta.dataResponse);
      }
    } catch (error) {
      console.error('Error al procesar el pedido:', error);
      toast.error('Error al procesar el pedido.');
    }
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
            <Input 
              label='Nombre' 
              name='nombre' 
              value={formData.nombre} 
              onChange={handleChange} 
              isInvalid={!!errors.nombre}
              errorMessage={errors.nombre}
              required 
            />
            <Input 
              label='Correo' 
              type='email' 
              name='correo' 
              value={formData.correo} 
              onChange={handleChange} 
              isInvalid={!!errors.correo}
              errorMessage={errors.correo}
              required 
            />
            <Input 
              label='Dirección' 
              name='direccion' 
              value={formData.direccion} 
              onChange={handleChange} 
              isInvalid={!!errors.direccion}
              errorMessage={errors.direccion}
              required 
            />
            
            {/* Select para los departamentos */}
            <Select 
              label='Departamento' 
              name='ciudad' 
              selectedKeys={[formData.ciudad]} 
              onChange={handleChange} 
              isInvalid={!!errors.ciudad}
              errorMessage={errors.ciudad}
            >
              {Departamentos.map((depto) => (
                <SelectItem key={depto.nombre} value={depto.nombre}>
                  {depto.nombre}
                </SelectItem>
              ))}
            </Select>

            <div className='flex items-center mt-4'>
              <Checkbox 
                name='aceptaTerminos' 
                isSelected={formData.aceptaTerminos} 
                onChange={handleChange}
              />
              <Link 
                to="/terminosycondiciones" 
                className="ml-2 text-blue-500 hover:text-blue-700 underline"
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
