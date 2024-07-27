import React, { useEffect, useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Tooltip, Input, Textarea, Image } from "@nextui-org/react";
import { EditIcon } from "../../../states/icons/EditIcon";
import imagen from '../../../assets/imagen.svg'; // Ruta al icono de imagen
import { toast } from 'react-toastify'; // Importa toast
import { EyeIcon } from '../../../states/icons/EyeIcon';
const RUTA_API = import.meta.env.VITE_API_URL;

export const DetalleCategoria = ({ id }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [categoria, setCategoria] = useState(null);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagenActual, setImagenActual] = useState('');
  const [nuevaImagen, setNuevaImagen] = useState(null);
   const [FechaCreacion, setFechaCreacion] = useState('');
  useEffect(() => {
    if (isOpen) {
      const loadData = async () => {
        try {
          const response = await fetch(`${RUTA_API}/api/categoria/${id}`);
          const data = await response.json();
          setCategoria(data);
          setNombre(data.nombre || '');
          setDescripcion(data.descripcion || '');
          setImagenActual(data.imagen || '');
          setFechaCreacion(data.fechaCreacion || '');
        } catch (error) {
          console.error('Error cargando la categoría:', error);
        }
      };

      loadData();
    }
  }, [isOpen, id]);



  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNuevaImagen(file);
    }
  };

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
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="lg"
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          }
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <h3>Detalle Categoría</h3>
              </ModalHeader>
              <ModalBody>
              
                
                  <label className="block text-sm font-medium text-gray-700">Imagen Actual</label>
                  <div className="relative mt-2 m-auto">
                    <Image 
                      src={`${RUTA_API}/public/${imagenActual}`} 
                      alt="Imagen Actual" 
                      width={200} 
                      height={200} 
                      className="object-cover rounded-md" 
                    />
                  </div>
             
            
                
                <Input
                disabled

                  className='w-full'
                  fullWidth
                  clearable
                  label="Nombre"
                  value={nombre}
               
                />
               
                <Textarea
                disabled
                  fullWidth
                  label="Descripción"
                  value={descripcion}
              
                  rows={4}
                  className="  w-full"
                />
                         <Input
                disabled

                  className='w-full'
                  fullWidth
                  clearable
                  label="Fecha Creacion"
                  value={new Date(
                    FechaCreacion,
                  ).toLocaleDateString()}
               
                />
              </ModalBody>
              <ModalFooter>
                <Button auto flat color="error" onClick={onClose}>
                  Cancelar
                </Button>
               
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
