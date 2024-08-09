const RUTA_API = import.meta.env.VITE_API_URL;
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
  CheckboxGroup,
} from '@nextui-org/react';

export const ModalCategoria = ({ selectedCategoria, onCategoriasChange }) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [categoriasSelect, setCategoriasSelect] = useState(selectedCategoria);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    // Función para obtener las categorías desde la API
    const fetchCategorias = async () => {
      try {
        const response = await fetch(`${RUTA_API}/api/categorias`);
        if (response.ok) {
          const data = await response.json();
          setCategorias(data);
        } else {
          console.error(
            'Error al obtener las categorías:',
            response.statusText,
          );
        }
      } catch (error) {
        console.error('Error al obtener las categorías:', error);
      }
    };

    fetchCategorias();
  }, []);

  const handleCheckboxChange = selected => {
    setCategoriasSelect(selected);
    onCategoriasChange(selected);
  };

  return (
    <>
      <Button onPress={onOpen} categoria='primary' color='primary'>
        Categorías
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        size='4xl'
      >
        <ModalContent>
          <ModalHeader className='flex flex-col gap-1'>Categorías</ModalHeader>
          <ModalBody>
            <CheckboxGroup
              value={categoriasSelect}
              onChange={handleCheckboxChange}
            >
              <div className='grid sm:grid-cols-6 sm:gap-10 grid-cols-3 gap-2'>
                {categorias.map(categoria => (
                  <label
                    key={categoria._id}
                    className='flex flex-col items-center border-2 border-gray-300 px-3 pt-3 rounded-2xl'
                  >
                    <div className='flex'>
                      <img
                        src={`http://localhost:3000/public/${categoria.imagen}`}
                        alt={categoria.nombre}
                        className='w-16 h-20 rounded-lg'
                      />
                    </div>
                    <span>{categoria.nombre}</span>
                    <Checkbox className='mb-5' value={categoria.nombre} />
                  </label>
                ))}
              </div>
            </CheckboxGroup>
          </ModalBody>
          <ModalFooter className='mr-48 sm:mr-0 sm:mt-5'>
            <Button categoria='danger' variant='light' onPress={onClose}>
              Cerrar
            </Button>
            <Button
              categoria='primary'
              onPress={() => {
                onCategoriasChange(categoriasSelect);
                onClose();
              }}
            >
              Enviar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
