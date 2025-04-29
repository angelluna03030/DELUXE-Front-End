import { Link } from 'react-router-dom';
import { Image } from '@nextui-org/react';
import { useEffect, useState, useContext } from 'react';
import logo from "../../assets/imagen.png"
import { SearchIcon } from './SearchIcon';
import { CarritoContext } from '../../states/context/ContextCarrito';
import { getData } from '../../config/utils/metodoFecht';
import { Buscador } from '../Inputs';
import { SearchIconNegro } from './SearchIconnegro';
const RUTA_API = import.meta.env.VITE_API_URL;
import menu from "../../assets/menu.png"
import { Busqueda } from './Busqueda';

export const Layout = () => {
  const { carrito } = useContext(CarritoContext) || { carrito: [] };


  const [consulta, setConsulta] = useState('');
  const [items, setItems] = useState<any[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
 
  const [isHovered, setIsHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para el menú móvil

  const fetchProductos = async (searchTerm = '') => {
    try {
      const url = `${RUTA_API}/api/productos/buscar/${searchTerm}`;
      const response = await getData(url);
      if (response.status !== 200) {
        console.error("Error al buscar productos:", response.status);
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

  const toggleSearch = () => setIsSearchOpen((prev) => !prev);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <>
      <div className="cursor-pointer mb-4 py-3 text-white flex bg-transparent items-center justify-between sm:text-sm text-xs h-auto z-10 
        border-b border-gray-300 border-opacity-50  text-[#0e0e0e] transition-all duration-300 px-5"
        
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        >

        {/* Logo e Icono de menú */}
        <div className="sm:hidden">
          <button onClick={toggleMenu}>
            <Image src={menu} width={35} height={35} alt="Menú" />
          </button>
        </div>
        <div className="flex items-center space-x-2">
        <Image src={logo} width={45} height={45} className="sm:h-10 sm:w-20 md:h-20 lg:h-5 xl:h-5 " alt="Logo" />
        <span className="pl-1 pr-10">DELUXE</span>
        </div>

        {/* Ícono de menú en móviles */}

        {/* Menú de navegación (Oculto en móviles) */}
        <div className="hidden sm:flex space-x-6">
          <Link to={"/"} className="relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-gray-300 hover:after:w-full after:transition-all after:duration-300">
            INICIO
          </Link>
          <Link to={"/productos/todos"} className="relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-gray-300 hover:after:w-full after:transition-all after:duration-300">
            TODOS
          </Link>
          <Link to={""} className="relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-gray-300 hover:after:w-full after:transition-all after:duration-300">
            Contacto
          </Link>
          <Link to={"/terminosycondiciones"} className="relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-gray-300 hover:after:w-full after:transition-all after:duration-300">
          Términos y Condiciones
          </Link>
        </div>

        {/* Iconos de carrito y búsqueda */}
        <div className="flex items-center space-x-4 border-l mx-5 border-gray-300 border-opacity-50 pl-4">
          <div onClick={toggleSearch} className="cursor-pointer">
           <SearchIconNegro /> 
          </div>
          <Link to='/carritocompras' className='relative pb-3'>
          
            {carrito.length > 0 && (
              <div className='bg-stroke-red-700 w-3 h-3 ml-2 mt-6 rounded-full absolute  z-50'></div>
            )}
            <span className="svg-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                className={`icon icon-cart-empty w-9 h-9  text-black transition-all duration-300`}
                viewBox="0 0 30 30">
                <path fill="currentColor" fillRule="evenodd"
                  d="M15.75 11.8h-3.16l-.77 11.6a5 5 0 0 0 4.99 5.34h7.38a5 5 0 0 0 4.99-5.33L28.4 11.8zm0 1h-2.22l-.71 10.67a4 4 0 0 0 3.99 4.27h7.38a4 4 0 0 0 4-4.27l-.72-10.67h-2.22v.63a4.75 4.75 0 1 1-9.5 0zm8.5 0h-7.5v.63a3.75 3.75 0 1 0 7.5 0z">
                </path>
              </svg>
            </span>
          </Link>
          <Buscador />
        </div>
      </div>

      {/* Menú desplegable en móviles */}
      <div className={`sm:hidden fixed top-0 left-0 w-full h-72 bg-black bg-opacity-70 z-50 transform ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300`}>
        <div className="bg-white w-full h-full p-5">
          <button onClick={toggleMenu} className="absolute top-5 right-5 text-xl">✖</button>
          <nav className="flex flex-col space-y-4 mt-10">
            <Link to={"/"} onClick={toggleMenu} className="text-lg text-gray-800 hover:text-gray-500">INICIO</Link>
            <Link to={"/productos/todos"} onClick={toggleMenu} className="text-lg text-gray-800 hover:text-gray-500">TODOS</Link>
            <Link to={""} onClick={toggleMenu} className="text-lg text-gray-800 hover:text-gray-500">Contacto</Link>
          </nav>
        </div>
      </div>

      {isSearchOpen && <Busqueda />}
    </>
  );
};
