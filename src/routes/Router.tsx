import { Routes, Route } from 'react-router-dom';
import { Sesion } from '../views/Sesion';
import { Catalogo } from '../views/Catalogo';
import { ProductoDetalle } from '../views/Producto';
import { Categoria } from '../views/CategoriasProductos';
import { Productos } from '../views/Productos.modulo';
import { BuscarProductos } from '../views/BuscarProductos';
import { TablaCarrito } from '../views/CarritoComprar/TablaCarritoCompras';
import { Categorias } from '../views/Categorias.modulo';
import { RegistrarCatalogo } from '../views/Catalogo.module';
import PrivateRoute from './RutasPrivadas';
import {TerminosyCondiciones} from "../views/TerminosYCondiciones"
export const Rutas = () => {
  return (
    <Routes>
      <Route path='/' element={<Catalogo />} />
      <Route path='/sesion' element={<Sesion />} />
      <Route path='/terminosycondiciones' element={<TerminosyCondiciones />} />
      <Route path='/catalogo' element={<Catalogo />} />
      <Route path='/producto/:id' element={<ProductoDetalle />} />
      <Route path='/carritocompras' element={<TablaCarrito />} />
      <Route path='/categoria/:categoria' element={<Categoria />} />
      <Route path='/productos/buscar/:query' element={<BuscarProductos />} />

      <Route
        path='/registrarproductos'
        element={
          <PrivateRoute>
            <Productos />
          </PrivateRoute>
        }
      />
      <Route
        path='/registrarcategoria'
        element={
          <PrivateRoute>
            <Categorias />
          </PrivateRoute>
        }
      />
      <Route
        path='/registrarcatalogo'
        element={
          <PrivateRoute>
            <RegistrarCatalogo />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};
