import { Button } from "@nextui-org/react";
import { HeartIcon } from "./Icon";
import { useState } from "react";
import { putData } from "../../../config/utils/metodoFecht";
import { toast } from "react-toastify";

const RUTA_API = import.meta.env.VITE_API_URL;

interface FavoritoProps {
  id: string; // Adjust the type if `id` is not a string
}

export const Favorito = ({ id }: FavoritoProps) => {
  const [liked, setLiked] = useState(false);

  const handleFavoriteToggle = async () => {
    try {
      const response = await putData(`${RUTA_API}/api/productos/favorito/${id}`);
      setLiked(!liked);
      toast.success(response.dataResponse.message || "Cambio exitosa");
    } catch (error) {
      toast.error("Error al cambiar el estado de favorito");
      console.error("Error updating favorite state:", error);
    }
  };

  return (
    <Button
      isIconOnly
      className={`text-default-900/60 mt-4 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2 ${liked ? "text-red-500" : ""}`}
      radius="full"
      variant="light"
      onPress={handleFavoriteToggle}
    >
      <HeartIcon
        className={liked ? "[&>path]:stroke-transparent" : ""}
        fill={liked ? "currentColor" : "none"}
      />
    </Button>
  );
};
