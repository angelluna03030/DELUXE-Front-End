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
  Textarea,
  Image,
} from '@nextui-org/react';
import { EditIcon } from '../../../states/icons/EditIcon';
import imagen from '../../../assets/imagen.svg'; // Ruta al icono de imagen
import { toast } from 'react-toastify'; // Importa toast

const RUTA_API = import.meta.env.VITE_API_URL;

export const EditarCategoria = ({ id }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [categoria, setCategoria] = useState(null);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagenActual, setImagenActual] = useState('');
  const [nuevaImagen, setNuevaImagen] = useState(null);

  useEffect(() => {
    if (isOpen) {
      const loadData = async () => {
        try {
          const response = await fetch(`${RUTA_API}/api/categorias/${id}`);
          const data = await response.json();
          setCategoria(data);
          setNombre(data.nombre || '');
          setDescripcion(data.descripcion || '');
          setImagenActual(data.imagen || '');
        } catch (error) {
          console.error('Error cargando la categoría:', error);
        }
      };

      loadData();
    }
  }, [isOpen, id]);

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('descripcion', descripcion);
    if (nuevaImagen) {
      formData.append('imagen', nuevaImagen);
    }

    try {
      const response = await fetch(`${RUTA_API}/api/categorias/${id}`, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Categoría actualizada:', data);
        toast.success('Categoría actualizada exitosamente'); // Mostrar notificación de éxito
        onOpenChange(false); // Cierra el modal después de la actualización
      } else {
        throw new Error('Error actualizando la categoría');
      }
    } catch (error) {
      console.error('Error actualizando la categoría:', error);
      toast.error('Error actualizando la categoría'); // Mostrar notificación de error
    }
  };

  const handleFileChange = event => {
    const file = event.target.files[0];
    if (file) {
      setNuevaImagen(file);
    }
  };

  return (
    <>
      <Tooltip content='Editar Categoria'>
        <span
          className='text-lg text-default-400 cursor-pointer'
          onClick={onOpen}
        >
          <EditIcon />
        </span>
      </Tooltip>

      <Modal
        backdrop='blur'
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size='lg'
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: 'easeOut',
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: 'easeIn',
              },
            },
          },
        }}
      >
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader>
                <h3>Editar Categoría</h3>
              </ModalHeader>
              <ModalBody>
                <label
                  className='w-80 flex flex-col items-center justify-center gap-2 cursor-pointer border-2 border-dashed border-gray-300 bg-white p-6 rounded-lg shadow-md mt-4 m-auto'
                  htmlFor='file'
                >
                  <img src={imagen} alt='icono' width={100} />
                  <span className='font-normal text-gray-700'>
                    Haz clic para subir una imagen
                  </span>
                  <input
                    type='file'
                    id='file'
                    accept='image/*'
                    onChange={handleFileChange}
                    className='hidden'
                  />
                  <div className='mt-4'>
                    <label className='block text-sm font-medium text-gray-700'>
                      Imagen Actual
                    </label>
                    <div className='relative mt-2'>
                      <Image
                        src={
                          nuevaImagen
                            ? URL.createObjectURL(nuevaImagen)
                            : `${RUTA_API}/public/${imagenActual}`
                        }
                        alt='Imagen Actual'
                        width={100}
                        height={100}
                        className='object-cover rounded-md'
                      />
                    </div>
                  </div>
                </label>

                <Input
                  className='w-full'
                  fullWidth
                  clearable
                  label='Nombre'
                  value={nombre}
                  onChange={e => setNombre(e.target.value)}
                />
                <Textarea
                  fullWidth
                  label='Descripción'
                  value={descripcion}
                  onChange={e => setDescripcion(e.target.value)}
                  rows={4}
                  className='mt-4  w-full'
                />
              </ModalBody>
              <ModalFooter>
                <Button auto flat color='error' onClick={onClose}>
                  Cancelar
                </Button>
                <Button auto onClick={handleUpdate}>
                  Guardar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
