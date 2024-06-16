import { SearchIcon } from "./SearchIcon";
import { Input } from "@nextui-org/react";

export const Buscador = () => {
    const onClear = () => {
        // Define la función onClear según tus necesidades
      };
  return (
    <Input
      isClearable
      className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl m-auto mt-4 mb-4"
      placeholder="Buscar por Nombre o Categorias"
      startContent={<SearchIcon />}
      onClear={onClear}
    />
  );
};
