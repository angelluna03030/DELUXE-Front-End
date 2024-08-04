import { Image } from '@nextui-org/react';
import { useState,useEffect } from 'react';

export const GaleriaProductos = ({ imagenes = [] }) => {
  const [active, setActive] = useState(imagenes[0]?.src || '');
  useEffect(() => {
    const changeImage = () => {
      // Choose the image to display after 5 seconds (replace with desired logic)
      const nextImageIndex = (activeIndex => (activeIndex + 1) % imagenes.length)(imagenes.findIndex(img => img.src === active));
      setActive(imagenes[nextImageIndex].src);
    };

    setTimeout(changeImage, 5000); // Change image after 5 seconds (5000 milliseconds)
  }, []);
  return (
    <div className="flex flex-col items-center">
      <div className=" max-w-5xl">
        <div className="relative h-80 w-80 m-auto">
          <Image
            layout="fill"
            className="rounded-lg object-cover object-center"
            src={active}
            alt="Active Product"
          />
        </div>
        <div className="grid grid-cols-5 gap-4 mt-auto mt-40">
          {imagenes.map((imagen, index) => (
            <div key={index} className="relative  w-full h-24 flex items-center justify-center 	rounded-md  ">
              <Image
                src={imagen.src}
                alt={imagen.alt || `Imagen ${index + 1}`}
                className="w-full h-full object-cover rounded-lg cursor-pointer"
                onClick={() => setActive(imagen.src)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
