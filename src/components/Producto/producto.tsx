import React, { useEffect, useState } from 'react';
import imagen_No_funtion from '../../assets/no-fotos.png';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Skeleton } from '@nextui-org/react';
import { Producto } from '@/states/models/ModelsProductos';
import { formatearNumero } from "../../states/function";
import { ColorDetalles } from '../Color';

const API_KEY = import.meta.env.VITE_API_KEY;
const RUTA_API = import.meta.env.VITE_API_URL;

interface ProductosProps {
  Ids: string[] | undefined;
}

export const Productos: React.FC<ProductosProps> = ({ Ids }) => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState(null);

  const handleSelectColor = (color: any) => {
    setSelectedColor(color);
  };

  useEffect(() => {
    const obtenerCatalogo = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${RUTA_API}/api/productos/ids`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
          },
          body: JSON.stringify({ id: Ids }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.length > 0) {
            setProductos(data);
          } else {
            toast.error('No se encontraron productos');
          }
        }
      } catch (err) {
        toast.error('No se ha podido traer los productos');
        console.error('Error al traer los productos:', err);
      } finally {
        setLoading(false);
      }
    };

    if (Ids) {
      obtenerCatalogo();
    }
  }, [Ids]);

  if (!Ids) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-10 px-5">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="overflow-hidden rounded-lg relative h-96 w-80 mx-auto">
            <Skeleton className="rounded-lg h-96 w-full" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 lg:min-h-screen flex items-center justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {productos.map((producto) => (
          <Link to={`/producto/${producto._id}`} key={producto._id}>
            <div
              className="max-w-xs sm:max-w-sm mx-auto cursor-pointer"
              onMouseEnter={() => setHoveredProduct(producto._id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="overflow-hidden ">
                <img
                loading='lazy'
                  onError={(event) => {
                    const imgElement = event.target as HTMLImageElement;
                    imgElement.src = imagen_No_funtion;
                  }}
                  src={
                    hoveredProduct === producto._id && producto.imagenes[1]
                      ? producto.imagenes[1]
                      : producto.imagenes[0] || imagen_No_funtion
                  }
                  alt={producto.nombreproductos}
                  className="w-full h-auto object-cover transition-opacity duration-700 ease-in-out transition-transform duration-700 ease-in-out hover:scale-105"
                />

              </div>

              <div className="bottom-0 z-10 left-0 right-0 h-36 sm:h-40 py-2 justify-start">
                <h1 className="mt-1 sm:mt-2 text-lg sm:text-xl ">{producto.nombreproductos}</h1>
                <p className="mt-1 sm:mt-2 text-lg sm:text-xl ">${formatearNumero(producto.precio) + ".00 COP" || 'Precio no disponible.'}</p>

                <p className="mt-1 sm:mt-2 flex">
                  {producto.colores.slice(0, 4).map((color) => (
                    <ColorDetalles
                      key={color}
                      color={color}
                      isSelected={selectedColor === color}
                      onSelect={handleSelectColor}
                    />
                  ))}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
