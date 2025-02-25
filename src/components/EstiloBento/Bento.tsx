import { Image } from "@nextui-org/react";
import React from "react";

interface BentoGalleryProps {
    images: string[];
}

export const BentoGallery: React.FC<BentoGalleryProps> = ({ images }) => {
    images = [
        "https://res.cloudinary.com/dryyuf1vh/image/upload/v1728357379/uploads/eppzeegufnz0iutkicog.jpg",
        "https://res.cloudinary.com/dryyuf1vh/image/upload/v1728357379/uploads/eppzeegufnz0iutkicog.jpg"
        ,
        "https://res.cloudinary.com/dryyuf1vh/image/upload/v1728357379/uploads/eppzeegufnz0iutkicog.jpg"
        ,
        "https://res.cloudinary.com/dryyuf1vh/image/upload/v1728357379/uploads/eppzeegufnz0iutkicog.jpg"
        ,
        "https://res.cloudinary.com/dryyuf1vh/image/upload/v1728357379/uploads/eppzeegufnz0iutkicog.jpg"
        ,
        "https://res.cloudinary.com/dryyuf1vh/image/upload/v1728357379/uploads/eppzeegufnz0iutkicog.jpg"
        ,
        "https://res.cloudinary.com/dryyuf1vh/image/upload/v1728357379/uploads/eppzeegufnz0iutkicog.jpg"
        ,
      
    ]
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[200px] sm:auto-rows-[250px] md:auto-rows-[300px] lg:auto-rows-[350px] gap-4 p-4 sm:p-8 md:p-12 lg:p-20">
            {images.map((image, index) => {
                // Alternar entre diferentes tamaños sin dejar espacios vacíos
                let sizeClass = "col-span-1 row-span-1";

                if (index % 7 === 0) {
                    sizeClass = "col-span-2 row-span-2"; // Imagen grande
                } else if (index % 5 === 0) {
                    sizeClass = "col-span-1 row-span-1"; // Imagen ancha
                } else if (index % 3 === 0) {
                    sizeClass = "col-span-2 row-span-1"; // Imagen alta
                }
                else if (index % 4 === 0) {
                    sizeClass = "col-span-1 row-span-1"; // Imagen alta
                } else if (index % 8 === 0) {
                    sizeClass = "col-span-2 row-span-1"; // Imagen alta
                }
                return (
                    <div key={index} className={`overflow-hidden rounded-2xl ${sizeClass}`}>
                        <Image
                            src={image}
                            alt={`Imagen ${index}`}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                    </div>
                );
            })}
        </div>
    );
};
