import { Routes, Route } from 'react-router-dom';
import { Sesion } from '../views/Sesion';
import { Catalogo } from '../views/Catalogo';
import { Producto } from '../views/Producto';
import { Categoria } from '../views/CategoriasProductos';
import {Productos} from "../views/Productos.modulo"
import {BuscarProductos} from "../views/BuscarProductos"
import {TablaCarrito} from "../views/CarritoComprar/TablaCarritoCompras"
import {Categorias} from "../views/Categorias.modulo"
import {RegistrarCatalogo} from "../views/RegistrarCatalogo"
export const Rutas = () => {
  return (
    <Routes>
      <Route path='/sesion' element={<Sesion />} />
      <Route path='/catalogo' element={<Catalogo />} />
      <Route path='/*' element={<Catalogo />} />
      <Route path='/' element={<Catalogo />} />
      <Route path='/producto/:id' element={<Producto />} />
      <Route path='/categoria/:categoria' element={<Categoria />} />
      <Route path='/registrarproductos' element={<Productos />} />
      <Route path='/productos/buscar/:query' element={<BuscarProductos />} />
      <Route path='/registrarcategoria' element={<Categorias />} />
      <Route path='/registrarcatalogo' element={<RegistrarCatalogo />} />
      <Route path='/carritocompras' element={<TablaCarrito />} />
    </Routes>
  );
};
