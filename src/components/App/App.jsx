import React from "react";
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import {Rutas} from "../../routes"
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
