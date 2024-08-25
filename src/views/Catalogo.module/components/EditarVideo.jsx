import React from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@nextui-org/react';
const RUTA_API = import.meta.env.VITE_API_URL;
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { VideoPlayer } from '../../../components/Video';

export const EditarVideo = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [catalogo, setCatalogo] = useState({
    imagenesparavideo: [],
    video: '',
    imagenesparagaleria: [],
    productosdestacados: [],
  });

  useEffect(() => {
    const obtenerCatalogo = async () => {
      try {
        const respuesta = await fetch(`${RUTA_API}/api/catalogo`);

        if (respuesta.ok) {
          const data = await respuesta.json();
          if (data.length > 0) {
            // Asumiendo que solo hay un catálogo
            setCatalogo(data[0]);
          } else {
            toast.error('No se encontraron recursos');
          }
        } else {
          toast.error('No se encontraron los recursos (404)');
          console.error('Error al obtener el catálogo:', respuesta.status);
        }
      } catch (err) {
        toast.error('No se ha podido traer el catálogo');
        console.error('Error al traer el catálogo:', err);
      }
    };

    obtenerCatalogo();
  }, []); // Se ejecuta solo una vez cuando el componente se monta.

  return (
    <>
      <Button onPress={onOpen}>Editar Video</Button>
      <Modal
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
                Cambiar El Video
              </ModalHeader>
              <ModalBody>
                <div className='h-96 w-52 m-auto'>
                  <VideoPlayer video={catalogo.video} />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='light' onPress={onClose}>
                 Cerrar
                </Button>
                <Button color='primary' onPress={onClose}>
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
