import React, { useEffect, useState } from 'react';
import { Button } from '@nextui-org/react';
import * as XLSX from 'xlsx';
import { getData } from '../../config/utils/metodoFecht';
import { toast } from 'react-toastify';
import { UsuariosCompras, UsuarioCompra, UsuarioProducto } from '../../states/models/ModelsProductos';

const RUTA_API = import.meta.env.VITE_API_URL;

export const CrearExcel = () => {
  const [usuarios, setUsuarios] = useState<UsuariosCompras[]>([]);

  useEffect(() => {
    getData(`${RUTA_API}/api/usuarios`)
      .then((response: { dataResponse?: UsuariosCompras[] }) => {
        console.log("Respuesta de la API:", response); // Verifica qué devuelve la API

        if (response?.dataResponse && Array.isArray(response.dataResponse)) {
          setUsuarios(response.dataResponse);
        } else {
          toast.warn("No hay datos disponibles.");
        }
      })
      .catch(error => {
        toast.error("Error al obtener los datos");
        console.error("Error en la petición:", error);
      });
  }, []);

  const handleExportExcel = () => {
    if (usuarios.length === 0) {
      toast.warn("No hay datos para exportar.");
      return;
    }

    // Aplanar la estructura de compras para que Excel la muestre correctamente
    const dataForExcel = usuarios.flatMap(usuario =>
      usuario.compras.map((compra: UsuarioCompra) =>
        compra.productos.map((producto: UsuarioProducto) => ({
          ID_Usuario: usuario._id,
          Nombre: usuario.nombre,
          Correo: usuario.correo,
          Dirección: usuario.direccion,
          Departamento: usuario.departamento,
          Fecha_Registro: new Date(usuario.fechaDeRegistro).toLocaleDateString(),
          Fecha_Compra: new Date(compra.fechaDeCompra).toLocaleDateString(),
          Producto: producto.nombre,
          Cantidad: producto.cantidad,
          Precio: producto.precio,
          Talla: producto.talla,
          Color: producto.color,
          Total_Compra: compra.totalCompra
        }))
      )
    ).flat();

    console.log("Datos exportados:", dataForExcel); // Verifica que se están generando correctamente

    if (dataForExcel.length === 0) {
      toast.warn("No hay compras registradas.");
      return;
    }

    const ws = XLSX.utils.json_to_sheet(dataForExcel);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "UsuariosCompras");
    XLSX.writeFile(wb, "Usuarios_Compras.xlsx");
  };

  return (
    <Button onPress={handleExportExcel} color="success" className="mb-4 text-white">
      Exportar Excel
    </Button>
  );
};
