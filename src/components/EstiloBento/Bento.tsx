import { Image, Skeleton } from "@nextui-org/react";
import React, { useState } from "react";
import imagen_No_funtion from '../../assets/no-fotos.png';

interface BentoGalleryProps {
    imagenes: string[] | undefined;
}

export const BentoGallery: React.FC<BentoGalleryProps> = ({ imagenes }) => {
    if (!imagenes || imagenes.length === 0) {
        return (
            <div className="flex justify-center items-center">
                <div className="overflow-hidden rounded-lg shadow-md relative h-96 w-80 mx-auto mt-10">
                    <Image
                        src="/no-fotos.png"
                        alt="No hay imágenes"
                        className="rounded-lg sm:m-5 h-96 w-80 m-auto mb-10"
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[200px] sm:auto-rows-[250px] md:auto-rows-[300px] lg:auto-rows-[350px] gap-4 p-4 sm:p-8 md:p-12 lg:p-20">
            {imagenes.map((image, index) => {
                // Alternar entre diferentes tamaños sin dejar espacios vacíos
                let sizeClass = "col-span-1 row-span-1";

                if (index % 7 === 0) {
                    sizeClass = "col-span-2 row-span-2"; // Imagen grande
                } else if (index % 5 === 0) {
                    sizeClass = "col-span-1 row-span-1"; // Imagen ancha
                } else if (index % 3 === 0) {
                    sizeClass = "col-span-2 row-span-1"; // Imagen alta
                } else if (index % 4 === 0) {
                    sizeClass = "col-span-1 row-span-1"; // Imagen alta
                } else if (index % 8 === 0) {
                    sizeClass = "col-span-2 row-span-1"; // Imagen alta
                }

                const [loaded, setLoaded] = useState(true);

                return (
                    <div key={index} className={`overflow-hidden rounded-2xl ${sizeClass} relative`}>
                        {!loaded && (
                            <Skeleton className="absolute inset-0 w-full h-full rounded-2xl" />
                        )}
                        <Image
                            loading="lazy"
                            onLoad={() => setLoaded(true)}
                            onError={(event: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                const imgElement = event.target as HTMLImageElement;
                                imgElement.src = imagen_No_funtion;
                                setLoaded(true);
                            }}
                            src={image}
                            alt={`Imagen ${index}`}
                            className={`w-full h-full object-cover transition-transform duration-300 hover:scale-105 ${!loaded ? 'hidden' : ''}`}
                        />
                    </div>
                );
            })}
        </div>
    );
};
