import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Rutas } from '../../routes';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'react-toastify/dist/ReactToastify.css';
export default function App() {
  return (
    <>
      <BrowserRouter>
        <Rutas></Rutas>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}
