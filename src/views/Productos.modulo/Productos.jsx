import { Navegacion } from "../../components/Nav";
import { TablaProductos } from "./components/TablaProducto";

export const Productos = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <Navegacion />
      <TablaProductos />
    </div>
  );
};
