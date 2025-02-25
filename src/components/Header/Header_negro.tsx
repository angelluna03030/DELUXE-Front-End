import { Link, useNavigate } from 'react-router-dom';
import { AutocompleteItem, Autocomplete, Image } from '@nextui-org/react';
import { useEffect, useState, useContext } from 'react';
import logo from "../../assets/imagen.png"
import { SearchIcon } from './SearchIcon';
import { CarritoContext } from '../../states/context/ContextCarrito';
import { getData } from '../../config/utils/metodoFecht';
import { Buscador } from '../Inputs';
import { SearchIconNegro } from './SearchIconnegro';
const RUTA_API = import.meta.env.VITE_API_URL;

export const HeaderNegros = () => {
  const navigate = useNavigate();
  const [consulta, setConsulta] = useState('');
  const [items, setItems] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
   const { contarProductos } = useContext(CarritoContext);
   const [isHovered, setIsHovered] = useState(false);

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
  const handleInputChange = (value) => {
    setConsulta(value);
    if (value.trim() !== '') {
      fetchProductos(value); // Llamar a la API solo si hay un término de búsqueda
    }
  };

  const handleSelectionChange = (item) => {
    if (item && item.value) {
      navigate(`/productos/buscar/${item.value}`);
    }
  };
  
  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (consulta.trim()) {
      navigate(`/productos/buscar/${consulta}`);
    }
  };
  
  return (
    <>
<div className="cursor-pointer mb-4 py-3  flex bg-transparent items-center justify-between sm:text-sm text-xs  h-auto z-10 
border-b border-gray-300 border-opacity-50  hover:bg-white  transition-all duration-300" 

onMouseEnter={() => setIsHovered(true)}
onMouseLeave={() => setIsHovered(false)}
>
  {/* Logo e icono a la izquierda */}
  <div className="flex items-center space-x-2  pr-4 px-11">
    <Image src={logo} width={45} height={45} className="sm:h-10 sm:w-20 md:h-20 lg:h-5 xl:h-5 " alt="Logo" />
    <span className="pl-1 pr-10">DULEXE</span>
  <div className="flex justify-center items-center space-x-6 flex-1 m-auto">
    <Link to={"/"} className="relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-gray-300  hover:after:w-full after:transition-all after:duration-300">
      INICIO
    </Link>
    <Link to={"/productos/todos"} className="relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-gray-300 hover:after:w-full after:transition-all after:duration-300">
      CAMISETAS
    </Link>
    <Link to={"/productos/todos"} className="relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-gray-300 hover:after:w-full after:transition-all after:duration-300">
      CAMISETAS
    </Link>
    <Link to={"/productos/todos"} className="relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-gray-300 hover:after:w-full after:transition-all after:duration-300">
      CAMISETAS
    </Link>
    <Link to={""} className="relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-gray-300  hover:after:w-full after:transition-all after:duration-300">
      Contacto
    </Link>
  </div>


  </div>

  {/* Links centrados */}

  {/* Iconos a la derecha con separación */}
  <div className="flex items-center space-x-4 border-l mx-5 border-gray-300 border-opacity-50 pl-4">
    <div onClick={toggleSearch} className="cursor-pointer">
<SearchIconNegro /> 
    </div>
    <Link to='/carritocompras' className='pb-3'>
    <p>{contarProductos}</p>
      <span className="svg-wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" className={`icon icon-cart-empty w-9 h-9 text-black transition-all duration-300`}
 viewBox="0 0 30 30">
          <path fill="currentColor" fill-rule="evenodd" d="M15.75 11.8h-3.16l-.77 11.6a5 5 0 0 0 4.99 5.34h7.38a5 5 0 0 0 4.99-5.33L28.4 11.8zm0 1h-2.22l-.71 10.67a4 4 0 0 0 3.99 4.27h7.38a4 4 0 0 0 4-4.27l-.72-10.67h-2.22v.63a4.75 4.75 0 1 1-9.5 0zm8.5 0h-7.5v.63a3.75 3.75 0 1 0 7.5 0z"></path>
        </svg>
      </span>
    </Link>
    <Buscador />
  </div>
</div>


{isSearchOpen && (
  <div className="fixed inset-0 flex items-start justify-start w-full bg-gray-900 bg-opacity-50 backdrop-blur-md transition-opacity z-50 ">
    <form 
      onSubmit={handleSubmit} 
      className="bg-white p-6  shadow-xl w-[1400px]  relative animate-fade-in"
    >
      <Autocomplete
        label="Búsqueda"
        variant="bordered"
        allowsCustomValue
        onSelectionChange={handleSelectionChange}
        onInputChange={handleInputChange}
        className="w-[1250px]"
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
        className="absolute top-9 right-3 text-black justify-center items-center m-auto  text-xl  transition"
      >
        ✖
      </button>
    </form>
  </div>
)}


    </>
  );
};
