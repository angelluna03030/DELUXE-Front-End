import { useState, useEffect } from 'react';
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
} from '@nextui-org/react';
const RUTA_API = import.meta.env.VITE_API_URL;
import { toast } from 'react-toastify';

export const EditarProductosDestacados = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [productos, setProductos] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);

  useEffect(() => {
    const obtenerCatalogo = async () => {
      try {
        const respuesta = await fetch(`${RUTA_API}/api/productos`);
        if (respuesta.ok) {
          const data = await respuesta.json();
          setProductos(data);
        } else {
          toast.error('No se encontraron los recursos (404)');
        }
      } catch (err) {
        toast.error('No se ha podido traer el catálogo');
      }
    };

    obtenerCatalogo();
  }, []);

  const handleCheckboxChange = productoId => {
    setProductosSeleccionados(prevSeleccionados =>
      prevSeleccionados.includes(productoId)
        ? prevSeleccionados.filter(id => id !== productoId)
        : [...prevSeleccionados, productoId],
    );
  };

  const handleEnviarProductosDestacados = async () => {
    try {
      const respuesta = await fetch(
        `${RUTA_API}/api/catalogo/productosdestacados`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ productosdestacados: productosSeleccionados }),
        },
      );

      if (respuesta.ok) {
        const data = await respuesta.json();
        toast.success('Productos destacados actualizados correctamente');
        onOpenChange(false); // Cerrar el modal después de enviar
      } else {
        toast.error('Error al actualizar productos destacados');
      }
    } catch (error) {
      toast.error('Error al conectar con el servidor');
      console.error('Error:', error);
    }
  };

  const productosFiltrados = productos.filter(producto =>
    producto.nombreproductos.toLowerCase().includes(filtro.toLowerCase()),
  );

  return (
    <>
      <Button onPress={onOpen}>Productos Destacados</Button>
      <Modal
        scrollBehavior='inside'
        backdrop='opaque'
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{
          backdrop:
            'bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20',
        }}
      >
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                Productos Destacados
              </ModalHeader>
              <ModalBody>
                <Input
                  placeholder='Buscar producto'
                  value={filtro}
                  onChange={e => setFiltro(e.target.value)}
                />
                <div className='flex flex-col gap-2'>
                  {productosFiltrados.map(producto => (
                    <div key={producto._id} className='flex items-center'>
                      <Checkbox
                        isSelected={productosSeleccionados.includes(
                          producto._id,
                        )}
                        onChange={() => handleCheckboxChange(producto._id)}
                      >
                        {producto.nombreproductos}
                      </Checkbox>
                    </div>
                  ))}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='light' onPress={onClose}>
                  Cerrar
                </Button>
                <Button
                  color='primary'
                  onPress={handleEnviarProductosDestacados}
                >
                  Enviar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
