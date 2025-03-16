import React, { useState, useEffect } from 'react';
import { CarritoContext } from './ContextCarrito';

const StateCarrito: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [carrito, setCarrito] = useState(() => {
    const savedCarrito = localStorage.getItem('carrito');
    return savedCarrito ? JSON.parse(savedCarrito) : [];
  });

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  const agregarProducto = (producto: { id: any; }, cantidadSeleccionada: any) => {
    setCarrito((prevCarrito: any[]) => {
      const productoExistente = prevCarrito.find(
        item => item.id === producto.id,
      );
      if (productoExistente) {
        return prevCarrito.map(item =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + cantidadSeleccionada }
            : item,
        );
      } else {
        return [
          ...prevCarrito,
          { ...producto, cantidad: cantidadSeleccionada },
        ];
      }
    });
  };

  const eliminarProducto = (productoId: any) => {
    setCarrito((prevCarrito: any[]) =>
      prevCarrito.filter(item => item.id !== productoId),
    );
  };

  const actualizarCantidad = (productoId: any, cantidad: any) => {
    setCarrito((prevCarrito: any[]) =>
      prevCarrito.map(item =>
        item.id === productoId ? { ...item, cantidad: cantidad } : item,
      ),
    );
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const calcularTotal = () => {
    return carrito.reduce(
      (total: number, item: { precio: number; cantidad: number; }) => total + item.precio * item.cantidad,
      0,
    );
  };
  const cambiarTalla = (productoId: any, nuevaTalla: any) => {
    setCarrito((prevCarrito: any[]) =>
      prevCarrito.map(item =>
        item.id === productoId ? { ...item, talla: nuevaTalla } : item,
      ),
    );
  };

  const cambiarColor = (productoId: any, nuevoColor: any) => {
    setCarrito((prevCarrito: any[]) =>
      prevCarrito.map(item =>
        item.id === productoId ? { ...item, color: nuevoColor } : item,
      ),
    );
  };
  const contarProductos = () => {
    return carrito.reduce((total: any, item: { cantidad: any; }) => total + item.cantidad, 0);
  };

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarProducto,
        eliminarProducto,
        actualizarCantidad,
        vaciarCarrito,
        calcularTotal,
        contarProductos,
        cambiarTalla,
        cambiarColor, 
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};

export default StateCarrito;
