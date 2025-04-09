import video from "../../assets/video.mp4"; // Asegúrate de que la ruta sea correcta
import { Favoritos } from "../Boton/BotonFavoritos";
import { Layout } from "../Header";
import React, { memo } from "react";

export const Video = () => {
  return (
    <div className="relative w-screen h-screen">
      {/* Video de fondo */}
      <video
        src={video}
        preload="metadata"
        playsInline
        controls={false}
        
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      
      {/* Contenido encima del video */}
      <div className="absolute inset-0 flex flex-col justify-between z-10">
        <Layout />
        
        {/* Botón de favoritos */}
        <div className="flex justify-center sm:justify-start p-4 sm:p-8">
          <Favoritos />
        </div>
      </div>
    </div>
  );
};
