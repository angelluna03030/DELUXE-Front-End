import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from '../../components/Layout';
import { Buscador } from '../../components/Inputs';
import { Footer } from '../../components/Footer';
import { Titulo } from '../../components/Titulo';
import { Descripcion } from '../../components/Descripcion';
import { Comprar, AgregarCarrito } from '../../components/Boton';
import { GaleriaProductos } from '../../components/GaleriaProducto';
import { Color } from '../../components/Color';
import { CarritoComprasIcono } from '../CarritoComprar/IconoCarritoCompras';
import { toast } from 'react-toastify'; // Asegúrate de importar toast si usas react-toastify
import { getData } from '../../config/utils/metodoFecht'; // Asegúrate de tener estos métodos correctamente importados
import {CargarProductos} from "../../components/CarcCargando/CargarProductos/CargarProductos"
const RUTA_API = import.meta.env.VITE_API_URL;

export const Producto = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedTalla, setSelectedTalla] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const { status, dataResponse } = await getData(
          `${RUTA_API}/api/productos/${id}`,
        );
        if (status >= 200 && status < 300) {
          setProducto(dataResponse);
        } else {
          toast.error('No se encontraron los recursos (404)');
        }
      } catch (err) {
        toast.error('No se ha podido traer el producto');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  const handleSelectColor = color => {
    setSelectedColor(color);
  };

  const handleSelectTalla = size => {
    setSelectedTalla(size);
  };

  if (loading)
    return (
      <p>
        <Layout />
        <Buscador />
        <CargarProductos></CargarProductos> 
        <Footer />
      </p>
    );

  return (
    <>
      <Layout />
      <Buscador />
      {producto && (
        <>
          <GaleriaProductos
            imagenes={producto.imagenes.map(img => ({
              src: `http://localhost:3000/public/${img}`,
              alt: `Imagen de producto ${img}`, // Puedes personalizar el texto según sea necesario
            }))}
          />
          <div style={{ display: 'flex' }} className='ml-6'>
            <Titulo
              titulo={producto.nombreproductos}
              precio={producto.precio}
            />
          </div>
          <br />
          <Descripcion descripcion={producto.descripcion} />
          <br />
          <p className='text-lg ml-4'>Tallas</p>
          <br />
          <div className='space-y-4'>
            <div className='grid grid-cols-6 gap-4'>
              {producto.tallas.map(size => (
                <div key={size} className='flex items-center space-x-2'>
                  <input
                    className='day-btn'
                    id={`size-${size.toLowerCase()}`}
                    type='checkbox'
                    checked={selectedTalla === size}
                    onChange={() => handleSelectTalla(size)}
                  />
                  <label
                    className='day-label'
                    htmlFor={`size-${size.toLowerCase()}`}
                  >
                    {size}
                  </label>
                </div>
              ))}
            </div>
            <div>
              <p className='text-lg ml-4'>Colores</p>
            </div>
            <div className='grid grid-cols-6 gap-4 ml-2'>
              {producto.colores.map(color => (
                <Color
                  key={color}
                  color={color}
                  isSelected={selectedColor === color}
                  onSelect={handleSelectColor}
                />
              ))}
            </div>
          </div>
          <div className='mt-4 flex ml-6'>
            <AgregarCarrito />
            <Comprar />
            <CarritoComprasIcono />
          </div>
        </>
      )}
      <Footer />
    </>
  );
};
