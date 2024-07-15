import {useState} from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import {PlusIcon} from "../../../states/icons/PlusIcon";
import {TargetImagen} from "./TargetImagen";
const RUTA_API = import.meta.env.VITE_API_URL;
import {postFormData} from "../../../config/utils/metodoFecht";
import { toast } from 'react-toastify';
export const ModalCrearProductos = ()=> {
  const [formData, setFormData] = useState({
    codigo : '',
    nombreproductos: '',
    estado: 1,
    precio: 0,
    descripcion: '',
    materiales: '',
    tallas: '',
    colores: [],
    imagenes : [],    
    categorias: [],
});

  const {isOpen, onOpen, onClose} = useDisclosure();
  const [size, setSize] = useState('md')

  const sizes = ["5xl"];
  const handleDrop = acceptedFiles => {
    const validarExtencion = acceptedFiles.filter(
        file =>
            file.type === 'image/jpeg' ||
            file.type === 'image/png' ||
            file.type === 'image/gif' ||
            file.type === 'image/jpg',
    );
    
    if (validarExtencion.length !== acceptedFiles.length) {
        toast.warn('Solo se permiten archivos JPG, PNG y GIF.');
    }
    setFormData(prevFormData => ({
        ...prevFormData,
        imagen_productos: validarExtencion,
    }));
};

  const handleSubmit = async e => {
    e.preventDefault();
    try {
        setAnimacionSubmit(true);
        // * Validación de campos
        validarProductos.parse(formData);
        // * Se formatean los datos para enviarlos por form-data
        const formDataToSend = new FormData();
        formDataToSend.append('nombreproductos', formData.nombreproductos);
        formDataToSend.append('marca', formData.marca);
        formDataToSend.append('precio', formData.precio);
        formDataToSend.append('categorias', formData.categorias);
        formDataToSend.append('materiales', formData.materiales);
        // Agregar cada color individualmente si colores no es null
        if (formData.colores) {
            formData.colores.forEach((color, index) => {
                formDataToSend.append('colores', color);
            });
        }
        // Se agregan las imagenes
        formData.imagen_productos.forEach((file, index) => {
            formDataToSend.append(`imagen_producto`, file);
        });
        // Agregar cada talla individualmente
        if (formData.tallas) {
            formData.tallas.forEach((talla, index) => {
                formDataToSend.append('tallas', talla);
            });
        }
        // * Enviar datos al endpoint
        const { status, dataResponse } = await postFormData(
            `${RUTA_API}/api/productos`,
            formDataToSend,
        );
        if (status >= 200 && status < 300) {
            setData(prevData => [dataResponse.datos, ...prevData]);
            toast.success('Producto registrado exitosamente');
            onSuccess(); // <- Esto debería cerrar el modal
        } else {
            toast.warn(dataResponse.mensaje);
        }
    } catch (err) {
        if (err.errors) {
            const formErrors = err.errors.reduce((acc, error) => {
                acc[error.path[0]] = error.message;
                return acc;
            }, {});
            setErrors(formErrors);
        } else {
            toast.error('Problemas al registrar el producto');
            console.error(err);
        }
    } finally {
        setAnimacionSubmit(false);
    }
};

  const handleOpen = (size) => {
    setSize(size)
    onOpen();
  }

  return (
    <>
      <div className="flex flex-wrap gap-3">
        {sizes.map((size) => (
          <Button key={size} onPress={() => handleOpen(size)} endContent={<PlusIcon/>}>Crear Producto</Button>
        ))}  
      </div>
      <Modal 
        size={size} 
        isOpen={isOpen} 
        onClose={onClose} 
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Crear Producto</ModalHeader>
              <ModalBody>



              <TargetImagen/>

              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
                <Button color="primary" onPress={onClose}>
                  Enviar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
