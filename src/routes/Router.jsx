import { Routes, Route } from 'react-router-dom';
import { Sesion } from '../views/Sesion';
import { Catalogo } from '../views/Catalogo';
import { Producto } from '../views/Producto';
import { Categoria } from '../views/CategoriasProductos';
import {Productos} from "../views/Productos.modulo"
import {Categorias} from "../views/Categorias.modulo"
import {RegistrarCatalogo} from "../views/RegistrarCatalogo"
export const Rutas = () => {
  return (
    <Routes>
      <Route path='/sesion' element={<Sesion />} />
      <Route path='/catalogo' element={<Catalogo />} />
      <Route path='/*' element={<Catalogo />} />
      <Route path='/' element={<Catalogo />} />
      <Route path='/producto' element={<Producto />} />
      <Route path='/categoria/:id' element={<Categoria />} />
      <Route path='/registrarproductos' element={<Productos />} />
      <Route path='/registrarcategoria' element={<Categorias />} />
      <Route path='/registrarcatalogo' element={<RegistrarCatalogo />} />


    </Routes>
  );
};
