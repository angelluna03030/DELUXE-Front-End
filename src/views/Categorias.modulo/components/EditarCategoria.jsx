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
  CircularProgress,

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
  const [cargando, setCargando] = useState(false);
  const [errors, setErrors] = useState({
    nombre: '',
    descripcion: '',
    imagen: ''
  });

  useEffect(() => {
    if (isOpen) {
      const loadData = async () => {
        setCargando(true);
        try {
          const response = await fetch(`${RUTA_API}/api/categorias/${id}`);
          const data = await response.json();
          setCategoria(data);
          setNombre(data.nombre || '');
          setDescripcion(data.descripcion || '');
          setImagenActual(data.imagen || '');
        } catch (error) {
          console.error('Error cargando la categoría:', error);
        } finally {
          setCargando(false);
        }
      };

      loadData();
    }
  }, [isOpen, id]);

  useEffect(() => {
    // Validación de nombre
    if (nombre && (nombre.length < 5 || nombre.length > 15 || /\d/.test(nombre))) {
      setErrors(prev => ({ ...prev, nombre: 'El nombre debe contener entre 5 y 15 letras sin números.' }));
    } else {
      setErrors(prev => ({ ...prev, nombre: '' }));
    }

    // Validación de descripción
    if (descripcion && (descripcion.length < 15 || descripcion.length > 100)) {
      setErrors(prev => ({ ...prev, descripcion: 'La descripción debe tener entre 15 y 100 caracteres.' }));
    } else {
      setErrors(prev => ({ ...prev, descripcion: '' }));
    }

    // Validación de imagen
    if (!nuevaImagen && !imagenActual) {
      setErrors(prev => ({ ...prev, imagen: 'Se debe seleccionar una imagen.' }));
    } else {
      setErrors(prev => ({ ...prev, imagen: '' }));
    }
  }, [nombre, descripcion, nuevaImagen, imagenActual]);

  const handleUpdate = async () => {
    if (errors.nombre || errors.descripcion || errors.imagen) {
      toast.error('Por favor, corrige los errores antes de guardar.');
      return;
    }
    if (nombre.length === 0 || descripcion.length === 0 || imagen === 0) {
      toast.error('Por favor, llene todo los campos no los deje vacios.');
      return;
    }
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('descripcion', descripcion);
    if (nuevaImagen) {
      formData.append('imagen', nuevaImagen);
    }

    setCargando(true);

    try {
      const response = await fetch(`${RUTA_API}/api/categorias/${id}`, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Categoría actualizada:', data);
        toast.success('Categoría actualizada exitosamente');
        onOpenChange(false);
      } else {
        throw new Error('Error actualizando la categoría');
      }
    } catch (error) {
      console.error('Error actualizando la categoría:', error);
      toast.error('Error actualizando la categoría');
    } finally {
      setCargando(false);
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
                {cargando ? (
                  <div className='flex justify-center items-center h-40'>
                  <CircularProgress />
                </div>
                ) : (
                  <>
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
                        {errors.imagen && (
                          <div className='text-red-500 text-sm mt-2'>{errors.imagen}</div>
                        )}
                      </div>
                    </label>

                    <Input
                        isInvalid={!!errors.nombre}
                        color={errors.nombre ? "danger" : ""}
                        errorMessage={errors.nombre}
                      className='w-full'
                      fullWidth
                      clearable
                      label='Nombre'
                      value={nombre}
                      onChange={e => setNombre(e.target.value)}
                    />
                    

                    <Textarea
                     isInvalid={!!errors.descripcion}
                     color={errors.descripcion ? "danger" : ""}
                     errorMessage={errors.descripcion}
                      fullWidth
                      label='Descripción'
                      value={descripcion}
                      onChange={e => setDescripcion(e.target.value)}
                      rows={4}
                      className='mt-4  w-full'
                    />
                   
                  </>
                )}
              </ModalBody>
              <ModalFooter className='mr-72 sm:mr-0 sm:mt-5'>
                <Button auto flat color='error' onClick={onClose}>
                  Cancelar
                </Button>
                <Button auto onClick={handleUpdate} disabled={cargando}>
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
