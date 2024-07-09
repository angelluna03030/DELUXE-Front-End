
import React from 'react';
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import imagen from '../../assets/OIP.jpg';
import imagen1 from '../../assets/imagen1.jpeg';
import imagen2 from '../../assets/imagen2.jpeg';
import imagen3 from '../../assets/imagen3.jpeg';
import imagen4 from '../../assets/imagen4.jpeg';

export const GaleriaProductos = () => {
  const productos = [
    { original: imagen, alt: 'Producto 1' },
    { original: imagen2, alt: 'Producto 2' },
    { original: imagen1, alt: 'Producto 3' },
    { original: imagen3, alt: 'Producto 4' },
    { original: imagen4, alt: 'Producto 5' },
  ];

  return (
    <div className='flex justify-center items-center  '>
         <div className="w-full ">
         <ImageGallery items={productos}    showBullets={true}  autoPlay={true} disableThumbnailSwipe={true} disableSwipe={true}  thumbnailPosition={"bottom"} showPlayButton={false} disableThumbnailScroll={true} />
         </div>
    
    </div>
  );
};
