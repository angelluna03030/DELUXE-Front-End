import { useNavigate } from 'react-router-dom';
import { AutocompleteItem, Autocomplete } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { getData } from '../../config/utils/metodoFecht';

const RUTA_API = import.meta.env.VITE_API_URL;

export const Busqueda = () => {
  const navigate = useNavigate();
  const [consulta, setConsulta] = useState('');
  const [items, setItems] = useState<any[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(true); // Estado para manejar la visibilidad

  const fetchProductos = async (searchTerm = '') => {
    try {
      const url = `${RUTA_API}/api/productos/buscar/${searchTerm}`;
      const response = await getData(url);

      if (response.status !== 200) {
        if (response.status === 401) {
          console.error("No autorizado: Verifique sus credenciales.");
        } else {
          console.error("Error al buscar productos:", response.status);
        }
        return;
      }
      setItems(Array.isArray(response.dataResponse) ? response.dataResponse : []);
    } catch (error) {
      console.error('Error al buscar productos:', error);
    }
  };

  useEffect(() => {
    if (consulta.trim() !== '') {
      fetchProductos(consulta);
    }
  }, [consulta]);

  const handleInputChange = (value: any) => {
    setConsulta(value);
    if (value.trim() !== '') {
      fetchProductos(value);
    }
  };

  const handleSelectionChange = (item: { value: string }) => {
    if (item && item.value) {
      navigate(`/productos/buscar/${item.value}`);
      setIsSearchOpen(false); // Cerrar modal al seleccionar un producto
    }
  };

  const toggleSearch = () => {
    setIsSearchOpen(false);
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (consulta.trim()) {
      navigate(`/productos/buscar/${consulta}`);
      setIsSearchOpen(false); // Cerrar modal al hacer la búsqueda
    }
  };

  if (!isSearchOpen) return null; // Ocultar modal si está cerrado

  return (
<div className="fixed inset-0 flex items-start justify-center  bg-gray-900 bg-opacity-50 backdrop-blur-md transition-opacity z-50 ">
  <form
    onSubmit={handleSubmit}
    className="bg-white flex p-6 shadow-xl  w-full  relative animate-fade-in mx-auto"
  >
    <Autocomplete
      label="Búsqueda"
      variant="bordered"
      allowsCustomValue
      onSelectionChange={(key) => {
        const selectedItem = items.find(item => item._id === key);
        if (selectedItem) {
          handleSelectionChange({ value: selectedItem._id });
        }
      }}
      onInputChange={handleInputChange}
      className="w-11/12 "
    >
      {items.map((item) => (
        <AutocompleteItem key={item._id} value={item._id}>
          {item.nombreproductos}
        </AutocompleteItem>
      ))}
    </Autocomplete>
    <button
      type="button"
      onClick={toggleSearch}
      className="mx-2 m-auto  text-black text-xl transition"
    >
      ✖
    </button>
  </form>
</div>

  );
};
