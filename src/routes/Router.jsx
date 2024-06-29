import { Routes, Route } from 'react-router-dom';
import { Sesion } from '../views/Sesion';
import { Catalogo } from '../views/Catalogo';
import {Producto} from "../views/Producto"
export const Rutas = () => {
  return (
    <Routes>
      <Route path='/sesion' element={<Sesion />} />
      <Route path='/catalogo' element={<Catalogo />} />
      <Route path='/*' element={<Catalogo />} />
      <Route path='/' element={<Catalogo />} />
      <Route path='/producto' element={<Producto />} />



    </Routes>
  );
};
