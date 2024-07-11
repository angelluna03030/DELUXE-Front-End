import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';

// Material UI
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import Skeleton from "@mui/material/Skeleton";

// Next UI
import { Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Chip, Tooltip } from "@nextui-org/react";

// Componentes
import Carrusel from "./Carrusel";

// Funciones
import { getData } from "../../../utils/api/metodosFetch";
import { formatearFecha } from "../../../utils/functions/formatearFecha";

const RUTA_API = import.meta.env.VITE_API_URL;

const DetalleProducto = ({ id }) => {

    // Estado inicial del formulario
    const [formData, setFormData] = useState({
        id_producto: id,
        nombre_producto: "",
        marca: "",
        precio: 0,
        existencias: 0,
        calificacion: 0,
        cantidad_calificacion: 0,
        estado_producto: "",
        categoria: "",
        tipo_producto: "",
        color_productos: [],
        imagen_productos: [],
        lote_productos: [],
        talla_productos: []
    });
    const [loading, setLoading] = useState(true);

    // * Traer datos de categoría cuando carga el componente
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { status, dataResponse } = await getData(`${RUTA_API}/api/productos/${id}`);
                if (status >= 200 && status < 300) {
                    const {
                        id_producto,
                        nombre_producto,
                        marca,
                        precio,
                        existencias,
                        calificacion,
                        cantidad_calificacion,
                        estado_producto,
                        categoria,
                        tipo_producto,
                        color_productos,
                        imagen_productos,
                        lote_productos,
                        talla_productos } = dataResponse.datos;
                    setFormData({
                        id_producto,
                        nombre_producto,
                        marca,
                        precio,
                        existencias,
                        calificacion,
                        cantidad_calificacion,
                        estado_producto: estado_producto === 1 ? 'Activo' : estado_producto === 2 ? 'Agotado' : 'Inactivo',
                        categoria,
                        tipo_producto: (
                            tipo_producto === 0 ? 'Común' : tipo_producto === 1 ? 'Perecedero' : 'Prenda'
                        ),
                        color_productos: color_productos.map(color => color.colore.color),
                        imagen_productos: imagen_productos.map((imagen) => ({
                            key: imagen.id_imagen_producto,
                            imagen: imagen.nombre_imagen,
                            nombre_producto
                        })),
                        lote_productos,
                        talla_productos
                    });
                }
            } catch (err) {
                toast.error('No se encontraron los recursos (404)');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    return (

        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
            }}
        >
            <div style={{ width: '100%' }}>
                <Box
                    sx={{
                        '& > :not(style)': { m: 1, width: '100%' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            {
                                loading ? <Skeleton />
                                    : <Input
                                        isDisabled
                                        name="categoria"
                                        value={formData.categoria.nombre_categoria}
                                        label="Nombre categoria"
                                        variant="bordered"
                                        fullWidth
                                    />
                            }
                        </Grid>
                        <Grid item xs={6}>
                            {
                                loading ? <Skeleton />
                                    : <Input
                                        isDisabled
                                        name="tipo_producto"
                                        value={formData.tipo_producto}
                                        label="Tipo de producto"
                                        variant="bordered"
                                        fullWidth
                                    />
                            }
                        </Grid>
                        <Grid item xs={12}>
                            {
                                loading ? <Skeleton />
                                    : <Input
                                        type="text"
                                        isDisabled
                                        variant="bordered"
                                        label="Nombre producto"
                                        name="nombre_producto"
                                        value={formData.nombre_producto}
                                        fullWidth
                                    />
                            }
                        </Grid>
                        <Grid item xs={12} md={6}>
                            {
                                loading ? <Skeleton />
                                    : <Input
                                        type="text"
                                        isDisabled
                                        variant="bordered"
                                        label="Precio"
                                        name="precio"
                                        value={formData.precio}
                                        fullWidth
                                    />
                            }
                        </Grid>
                        <Grid item xs={12} md={6}>
                            {
                                loading ? <Skeleton />
                                    : <Input
                                        type="text"
                                        isDisabled
                                        variant="bordered"
                                        label="Existencias"
                                        name="existencias"
                                        value={formData.existencias}
                                        fullWidth
                                    />
                            }
                        </Grid>
                        <Grid item xs={12}>
                            {
                                loading ? <Skeleton />
                                    : <Input
                                        isDisabled
                                        name="marca"
                                        value={formData.marca}
                                        label="Marca"
                                        variant="bordered"
                                        fullWidth
                                    />
                            }
                        </Grid>
                        <Grid item xs={12}>
                            <div className="flex justify-around items-center">
                                <div className="flex items-center">
                                    <Rating
                                        value={formData.calificacion}
                                        readOnly
                                        precision={0.5}
                                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                    />
                                    <p className="text-sm mx-2">
                                        {formData.calificacion.toFixed(1)}
                                    </p>
                                </div>
                                <p className="text-sm">Calificaciones: {formData.cantidad_calificacion}</p>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            {
                                loading ? <Skeleton />
                                    : <Input
                                        isDisabled
                                        name="estado_producto"
                                        value={formData.estado_producto}
                                        label="Estado del producto"
                                        variant="bordered"
                                        fullWidth
                                    />
                            }
                        </Grid>
                        {
                            /* Colores asociados */
                            formData.color_productos.length > 0 ?
                                <Grid item xs={12}>
                                    <p className='my-1'>Colores</p>
                                    <div className="w-full flex justify-around flex-wrap">
                                        {
                                            formData.color_productos.map(color => (
                                                <div key={color} className='w-2 h-2 p-4 rounded-full shadow-md' style={{ backgroundColor: `${color}` }}></div>
                                            ))
                                        }
                                    </div>
                                </Grid>
                                : ''
                        }
                        {
                            /* Lotes asociados */
                            formData.lote_productos.length > 0 ?
                                <Grid item xs={12}>
                                    <Dropdown>
                                        <DropdownTrigger>
                                            <Button
                                                fullWidth
                                                variant="bordered"
                                            >
                                                Lotes
                                            </Button>
                                        </DropdownTrigger>
                                        <DropdownMenu aria-label="Lotes asociados">
                                            {
                                                formData.lote_productos.map(lote => {
                                                    return (
                                                        <DropdownItem key={lote.id_lote_producto}>
                                                            <Tooltip showArrow={true} placement="right" content={
                                                                <div className="px-1 py-2">
                                                                    <div className="text-small font-bold">Fecha: {formatearFecha(lote.fecha_vencimiento)}</div>
                                                                    <div className="text-tiny">Cantidad: {lote.cantidad_lote}</div>
                                                                </div>
                                                            }>
                                                                <p>
                                                                    Lote: {lote.lote}
                                                                </p>
                                                            </Tooltip>
                                                        </DropdownItem>
                                                    )
                                                })
                                            }
                                        </DropdownMenu>
                                    </Dropdown>
                                </Grid>
                                : ''
                        }
                        {
                            /* Tallas asociados */
                            formData.talla_productos.length > 0 ?
                                <Grid item xs={12}>
                                    <Dropdown>
                                        <DropdownTrigger>
                                            <Button
                                                fullWidth
                                                variant="bordered"
                                            >
                                                Tallas
                                            </Button>
                                        </DropdownTrigger>
                                        <DropdownMenu aria-label="Tallas asociados">
                                            {
                                                formData.talla_productos.map(talla => {
                                                    return (
                                                        <DropdownItem key={talla.id_talla_producto}>
                                                            <p>
                                                                Talla: {talla.talla} - {talla.cantidad_talla}
                                                            </p>
                                                        </DropdownItem>
                                                    )
                                                })
                                            }
                                        </DropdownMenu>
                                    </Dropdown>
                                </Grid>
                                : ''
                        }
                        <Grid item xs={12}>
                            <Carrusel imagenes={formData.imagen_productos} />
                        </Grid>
                    </Grid>
                </Box>
            </ div>
        </Box>
    );
}

export default DetalleProducto;
