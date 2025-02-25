import video from "../../assets/video.mp4"; // Ensure the path is correct
import { Favoritos } from "../Boton/BotonFavoritos";
import { Layout } from "../Header";

export const Video = () => {
  return (
    <div className="w-screen h-screen relative">
      {/* Video de fondo */}
      <video
        src={video}
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      />
      
      {/* Contenido encima del video */}
      <div className="absolute top-0 left-0 w-full h-full z-10">
        <Layout />
      </div>
      <div className="absolute top-3/4 left-20 w-full h-full z-10">
      
      <Favoritos></Favoritos>
      </div>
    </div>
  );
};
