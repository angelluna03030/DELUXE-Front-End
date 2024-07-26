import { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Textarea
} from '@nextui-org/react';
import { PlusIcon } from '../../../states/icons/PlusIcon';
import { toast } from 'react-toastify';
import imagen from '../../../assets/imagen.svg'; // Asegúrate de que esta ruta sea correcta

const RUTA_API = import.meta.env.VITE_API_URL;

export const ModalCrearProductos = () => {
  const [formData, setFormData] = useState({
    codigo: '',
    nombreproductos: '',
    estado: 1,
    precio: 0,
    descripcion: '',
    materiales: '',
    tallas: [],
    colores: [],
    imagenes: [],
    categorias: '',
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = useState('md');
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = e => {
    setSelectedFiles(e.target.files);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('codigo', formData.codigo);
      formDataToSend.append('nombreproductos', formData.nombreproductos);
      formDataToSend.append('estado', formData.estado);
      formDataToSend.append('precio', formData.precio);
      formDataToSend.append('descripcion', formData.descripcion);
      formDataToSend.append('materiales', formData.materiales.join(','));
      formDataToSend.append('categorias', formData.categorias);
      formData.tallas.forEach(talla => formDataToSend.append('tallas', talla));
      formData.colores.forEach(color =>
        formDataToSend.append('colores', color),
      );

      for (const file of selectedFiles) {
        formDataToSend.append('imagenes', file);
      }

      // Enviar imágenes al servidor
      const response = await fetch(`${RUTA_API}/public`, {
        method: 'POST',
        body: formDataToSend,
      });

      const imageData = await response.json();
      const imageFiles = imageData.files;

      // Agregar los nombres de las imágenes al formData
      setFormData(prevFormData => ({
        ...prevFormData,
        imagenes: imageFiles,
      }));

      // Enviar información del producto al servidor
      const productResponse = await fetch(`${RUTA_API}/api/productos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          imagenes: imageFiles,
        }),
      });

      const productData = await productResponse.json();

      if (productResponse.ok) {
        toast.success('Producto registrado exitosamente');
        onClose(); // Cerrar el modal al éxito
      } else {
        toast.warn(productData.mensaje);
      }
    } catch (err) {
      toast.error('Problemas al registrar el producto');
      console.error(err);
    }
  };

  const handleOpen = size => {
    setSize(size);
    onOpen();
  };

  return (
    <>
      <div className='flex flex-wrap gap-3'>
        <Button onPress={() => handleOpen('3xl')} endContent={<PlusIcon />}>
          Crear Producto
        </Button>
      </div>
      <Modal size={size} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <>
            <ModalHeader className='flex flex-col gap-1'>
              Crear Producto
            </ModalHeader>
            <ModalBody>
              <form onSubmit={handleSubmit}>
                <div className='sm:flex sm:mb-5'>
                  <Input
                    className='sm:ml-5 sm:mr-5 mb-5 flex w-full flex-wrap md:flex-nowrap gap-4'
                    type='text'
                    value={formData.codigo}
                    onChange={e =>
                      setFormData({ ...formData, codigo: e.target.value })
                    }
                    placeholder='Código'
                    required
                  />
                  <Input
                    className='sm:ml-5 sm:mr-5  mb-5 flex w-full flex-wrap md:flex-nowrap gap-4'
                    type='text'
                    value={formData.nombreproductos}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        nombreproductos: e.target.value,
                      })
                    }
                    placeholder='Nombre del producto'
                    required
                  />
                </div>
                <div className='sm:flex sm:mb-5'>
                  <Textarea
                    className='sm:ml-5 sm:mr-5 mb-5 flex w-full flex-wrap md:flex-nowrap gap-4'
                    type='text'
                    value={formData.descripcion}
                    onChange={e =>
                      setFormData({ ...formData, descripcion: e.target.value })
                    }
                    placeholder='Descripcion del producto'
                    required
                  />
                  <Input
                    className='sm:ml-5 sm:mr-5  mb-5 flex w-full flex-wrap md:flex-nowrap gap-4'
                    type='number'
                    value={formData.precio}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        precio: e.target.value,
                      })
                    }
                    placeholder='Precio del producto'
                    required
                  />
                </div>
                <div className='sm:flex sm:mb-5 '>
                  <Input
                    className='sm:ml-5 sm:mr-5 mb-5 flex w-full flex-wrap md:flex-nowrap gap-4'
                    type='text'
                    value={formData.colores}
                    onChange={e =>
                      setFormData({ ...formData, colores: e.target.value })
                    }
                    placeholder='Tallas'
                    required
                  />
              
                      <Input
                    className='sm:ml-5 sm:mr-5 mb-5 flex w-full flex-wrap md:flex-nowrap gap-4'
                    type='text'
                    value={formData.tallas}
                    onChange={e =>
                      setFormData({ ...formData, tallas: e.target.value })
                    }
                    placeholder='Colores'
                    required
                  />
          </div>


                <label
                  className='h-52 w-72 flex flex-col items-center justify-between gap-5 cursor-pointer border-2 border-dashed border-gray-300 bg-white p-6 rounded-lg shadow-md   ml-8   mt-6  sm:ml-52'
                  htmlFor='file'
                >
                  <div className='flex items-center justify-center'>
                    <img src={imagen} alt='icono' width={100} />
                  </div>
                  <div className='flex items-center justify-center'>
                    <span className='font-normal text-gray-700'>
                      Haz clic para subir la imagen
                    </span>
                  </div>
                  <input
                    type='file'
                    id='file'
                    multiple
                    accept='image/*'
                    onChange={handleFileChange}
                    className='hidden'
                  />
                </label>

                <ModalFooter className='mr-40 sm:mr-0'>
                  <Button
                    color='danger'
                    variant='light'
                    onPress={onClose}
                    className=''
                  >
                    Cerrar
                  </Button>
                  <Button color='primary' type='submit'>
                    Enviar
                  </Button>
                </ModalFooter>
              </form>
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </>
  );
};
