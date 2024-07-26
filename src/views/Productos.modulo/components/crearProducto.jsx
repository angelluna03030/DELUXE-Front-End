import { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
  useDisclosure
} from '@nextui-org/react';
import { PlusIcon } from '../../../states/icons/PlusIcon';
import { toast } from 'react-toastify';
import imagen from '../../../assets/imagen.svg'; // Asegúrate de que esta ruta sea correcta
import { ModalColores } from './ModalColores';

const RUTA_API = import.meta.env.VITE_API_URL;

export const ModalCrearProductos = () => {
  const [formData, setFormData] = useState({
    codigo: '',
    nombreproductos: '',
    estado: 1,
    precio: 0,
    descripcion: '',
    materiales: [],
    tallas: [],
    colores: [],
    imagenes: [],
    categorias: '',
  });
  const [selectedTallas, setSelectedTallas] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = useState('md');
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddSizes = () => {
    const sizesArray = inputValue
      .split(',')
      .map((size) => size.trim().toUpperCase());
    setSelectedTallas(sizesArray);
    setFormData((prevFormData) => ({
      ...prevFormData,
      tallas: sizesArray,
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const filePreviews = files.map((file) => URL.createObjectURL(file));
    setSelectedFiles(filePreviews);

    setFormData((prevFormData) => ({
      ...prevFormData,
      imagenes: files,
    }));
  };

  const handleSubmit = async (e) => {
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
      formData.tallas.forEach((talla) => formDataToSend.append('tallas', talla));
      formData.colores.forEach((color) =>
        formDataToSend.append('colores', color),
      );

      for (const file of formData.imagenes) {
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
      setFormData((prevFormData) => ({
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

  const handleOpen = (size) => {
    setSize(size);
    onOpen();
  };

  const handleColoresChange = (selectedColores) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      colores: selectedColores,
    }));
  };

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button onPress={() => handleOpen('3xl')} endContent={<PlusIcon />}>
          Crear Producto
        </Button>
      </div>
      <Modal size={size} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
              Crear Producto
            </ModalHeader>
            <ModalBody>
              <form onSubmit={handleSubmit}>
                <div className="sm:flex sm:mb-5">
                  <Input
                    className="sm:ml-5 sm:mr-5 mb-5 flex w-full flex-wrap md:flex-nowrap gap-4"
                    type="text"
                    value={formData.nombreproductos}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        nombreproductos: e.target.value,
                      })
                    }
                    placeholder="Nombre del producto"
                    required
                  />
                  <Input
                    className="sm:ml-5 sm:mr-5 mb-5 flex w-full flex-wrap md:flex-nowrap gap-4"
                    type="number"
                    value={formData.precio}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        precio: e.target.value,
                      })
                    }
                    placeholder="Precio del producto"
                    required
                  />
                </div>
                <div className="sm:flex sm:mb-5">
                  <Textarea
                    className="sm:ml-5 sm:mr-5 mb-5 flex w-full flex-wrap md:flex-nowrap gap-4"
                    type="text"
                    value={formData.descripcion}
                    onChange={(e) =>
                      setFormData({ ...formData, descripcion: e.target.value })
                    }
                    placeholder="Descripcion del producto"
                    required
                  />
                  <Input
                    className="sm:ml-5 sm:mr-5 mb-5 flex w-full flex-wrap md:flex-nowrap gap-4"
                    type="text"
                    value={formData.materiales}
                    onChange={(e) =>
                      setFormData({ ...formData, materiales: e.target.value })
                    }
                    placeholder="Separa los Materiales con comas"
                    required
                  />
                </div>
                <div className="sm:flex sm:mb-5 mx-5">
                  <div className="sm:flex">
                    <Input
                      type="text"
                      className="w-full mt-5"
                      value={inputValue}
                      onChange={handleInputChange}
                      placeholder="Separa las tallas con comas"
                    />
                    <Button
                      className="w-60 mx-10 px-5 mt-5"
                      color="primary"
                      type="button"
                      onClick={handleAddSizes}
                    >
                      Agregar Tallas
                    </Button>
                    <div className="sm:mt-5">
                      <ModalColores selectedColores={formData.colores} onColoresChange={handleColoresChange} />
                      <div className="flex flex-wrap gap-2 mt-5 sm:ml-5">
                        {formData.colores.map((color, index) => (
                          <div
                            key={index}
                            className="w-8 h-8 rounded-full"
                            style={{ backgroundColor: color }}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-wrap gap-2 mt-5 sm:ml-5">
                  {selectedTallas.map((size) => (
                    <span
                      key={size}
                      className="px-4 py-2 border rounded bg-gray-200 text-black mr-1"
                    >
                      {size}
                    </span>
                  ))}
                </div>
                {selectedFiles.length === 0 ? (
                  <label
                    className="h-52 w-72 flex flex-col items-center justify-between gap-5 cursor-pointer border-2 border-dashed border-gray-300 bg-white p-6 rounded-lg shadow-md ml-8 mt-6 sm:ml-52"
                    htmlFor="file"
                  >
                    <div className="flex items-center justify-center">
                      <img src={imagen} alt="icono" width={100} />
                    </div>
                    <div className="flex items-center justify-center">
                      <span className="font-normal text-gray-700">
                        Haz clic para subir la imagen
                      </span>
                    </div>
                    <input
                      type="file"
                      id="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                ) : (
                  <div className="flex flex-wrap gap-4 m-5">
                    {selectedFiles.map((file, index) => (
                      <img
                        key={index}
                        src={file}
                        alt={`preview ${index}`}
                        className="h-40 w-40 object-cover rounded-2xl"
                      />
                    ))}
                  </div>
                )}
                <ModalFooter className="mr-48 sm:mr-0 sm:mt-5">
                  <Button
                    color="danger"
                    variant="light"
                    onPress={onClose}
                    className=""
                  >
                    Cerrar
                  </Button>
                  <Button color="primary" type="submit">
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
