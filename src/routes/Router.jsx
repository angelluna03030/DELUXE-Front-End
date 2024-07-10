import { Routes, Route } from 'react-router-dom';
import { Sesion } from '../views/Sesion';
import { Catalogo } from '../views/Catalogo';
import { Producto } from '../views/Producto';
import { Categoria } from '../views/CategoriasProductos';
import {Productos} from "../views/Productos"
import {Categorias} from "../views/Categorias"
import {RegistrarCatalogo} from "../views/RegistrarCatalogo"
export const Rutas = () => {
  return (
    <Routes>
      <Route path='/sesion' element={<Sesion />} />
      <Route path='/catalogo' element={<Catalogo />} />
      <Route path='/*' element={<Catalogo />} />
      <Route path='/' element={<Catalogo />} />
      <Route path='/producto' element={<Producto />} />
      <Route path='/categoria' element={<Categoria />} />
      <Route path='/registrarproductos' element={<Productos />} />
      <Route path='/registrarcategoria' element={<Categorias />} />
      <Route path='/registrarcatalogo' element={<RegistrarCatalogo />} />
    </Routes>
  );
};
