import React, { useEffect, useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Tooltip,
  Input,
  CircularProgress,
} from '@nextui-org/react';
import { EyeIcon } from '../../states/icons/EyeIcon';
import { getData } from '../../config/utils/metodoFecht';
const RUTA_API = import.meta.env.VITE_API_URL;
import { UsuariosCompras } from '../../states/models/ModelsProductos';

interface DetalleUsuarioProps {
  id: string;
}

export const DetalleUsuario: React.FC<DetalleUsuarioProps> = ({ id }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [usuario, setUsuario] = useState<UsuariosCompras | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const loadData = async () => {
        setLoading(true);
        try {
          const { status, dataResponse } = await getData(
            `${RUTA_API}/api/usuarios/${id}`
          );

          if (status >= 200 && status < 300) {
            setUsuario(dataResponse);
          } else {
            console.error('Error al cargar el usuario:', status);
          }
        } catch (error) {
          console.error('Error cargando el usuario:', error);
        } finally {
          setLoading(false);
        }
      };

      loadData();
    }
  }, [isOpen, id]);

  return (
    <>
      <Tooltip content='Detalles'>
        <span
          className='text-lg text-default-400 cursor-pointer active:opacity-50'
          onClick={onOpen}
        >
        <EyeIcon />
        </span>
      </Tooltip>

      <Modal
        backdrop='blur'
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size='lg'
      >
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader>
                <h3>Detalle Usuario</h3>
              </ModalHeader>
              <ModalBody>
                {loading ? (
                  <div className='flex justify-center items-center h-40'>
                    <CircularProgress />
                  </div>
                ) : (
                  usuario && (
                    <>
                       <div className='flex'>

                      <Input
                        disabled
                        className='w-full mx-1'
                        fullWidth
                        label='Nombre'
                        value={usuario.nombre}
                      />
                      <Input
                        disabled
                        className='w-full'
                        fullWidth
                        label='Correo'
                        value={usuario.correo}
                      />
                       </div>
                       <div className='flex'>

                      <Input
                        disabled
                        className='w-full mx-1'
                        fullWidth
                        label='Dirección'
                        value={usuario.direccion}
                      />
                      <Input
                        disabled
                        className='w-full mx-1'
                        fullWidth
                        label='Departamento'
                        value={usuario.departamento}
                      />
                       </div>
                      <Input
                        disabled
                        className='w-full'
                        fullWidth
                        label='Fecha de Registro'
                        value={new Date(usuario.fechaDeRegistro).toLocaleDateString()}
                      />
                      <h4 className='mt-4 font-semibold'>Compras</h4>
                      {usuario.compras.length > 0 ? (
                        usuario.compras.map((compra, index) => (
                            <div key={index} className='border p-4 rounded-lg shadow-md my-4 bg-white'>
                            <p className='text-lg font-semibold text-gray-700'>📅 <strong>Fecha:</strong> {new Date(compra.fechaDeCompra).toLocaleDateString()}</p>
                            <p className='text-lg font-semibold text-gray-700'>💰 <strong>Total:</strong> ${compra.totalCompra.toLocaleString()}</p>
                            <h5 className='mt-4 text-xl font-bold text-gray-800'>🛒 Productos:</h5>
                            <div className='mt-2 space-y-2'>
                              {compra.productos.map((producto, idx) => (
                                <div key={idx} className='p-3 bg-gray-100 rounded-md shadow-sm border-l-4 border-blue-500'>
                                  <p className='text-gray-700'><strong>📌 Nombre:</strong> {producto.nombre}</p>
                                  <p className='text-gray-700'><strong>🔢 Cantidad:</strong> {producto.cantidad}</p>
                                  <p className='text-gray-700'><strong>💵 Precio:</strong> ${producto.precio.toLocaleString()}</p>
                                  <p className='text-gray-700'><strong>📏 Talla:</strong> {producto.talla}</p>
                                  <p className='text-gray-700'><strong>🎨 Color:</strong> {producto.color}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))
                      ) : (
                        <p>No hay compras registradas.</p>
                      )}
                    </>
                  )
                )}
              </ModalBody>
              <ModalFooter>
                <Button  color='danger' onPress={onClose}>
                  Cerrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
