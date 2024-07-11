import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { useDropzone } from 'react-dropzone';

// Material UI
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Next UI
import { Input, Button, Select, SelectItem, Skeleton, Image, Card, CardBody } from "@nextui-org/react";

// Componentes
import Modal from '../../../components/Modal';
import Colores from './Colores';
import Carrusel from "./Carrusel";

// Funciones
import { validarProductos } from "../../../utils/functions/productos.validaciones";
import { putFormData, getData } from "../../../utils/api/metodosFetch";

const RUTA_API = import.meta.env.VITE_API_URL;

const EditarProducto = ({ id, closeModal, setData }) => {

    // Estado inicial del formulario y los errores
    const [formData, setFormData] = useState({
        id_producto: '',
        nombre_producto: '',
        marca: '',
        precio: '',
        categoria: '',
        colores: [],
        tallas: [],
    });
    const [imagenExistentes, setImagenExistentes] = useState([]);
    const [imagenNuevas, setImagenNuevas] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [tallas, setTallas] = useState([]);
    const [errors, setErrors] = useState({});
    const [animacionSubmit, setAnimacionSubmit] = useState(false);
    const [isLoading, setLoading] = useState(true);

    // * Controladores de modal colores
    const [modalColores, setModalColores] = useState(false);
    const handleCloseModalColores = () => setModalColores(false);

    // * Traer datos del producto cuando carga el componente
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
                        categoria,
                        color_productos,
                        imagen_productos,
                        talla_productos } = dataResponse.datos;
                    setFormData({
                        id_producto,
                        nombre_producto,
                        marca,
                        precio,
                        categoria,
                        colores: color_productos.map(color => color.id_color),
                        tallas: talla_productos.map(talla => talla.talla)
                    });
                    setImagenExistentes(imagen_productos);
                } else {
                    toast.error('No se encontraron los recursos (404)');
                }
            } catch (err) {
                toast.error('Ha ocurrido un problema al traer el producto');
            } finally {
                setLoading(false);
            }
        };
        cargarCategorias();
        cargarTallas();
        fetchData();
    }, [id]);

    // Validar el formulario
    const validateField = (name, value) => {
        try {
            validarProductos.pick({ [name]: true }).parse({ [name]: value });
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: null,
            }));
        } catch (err) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: err.errors[0].message,
            }));
        }
    };

    // * Funcion del evento change
    const handleChange = (e) => {
        const { name, value } = e.target;
        let processedValue = name === 'precio' ? parseInt(value) : value;
        // Si el campo es 'tallas' y tiene múltiples valores, actualiza el estado como una lista de IDs
        if (name === 'tallas') {
            processedValue = value.split(",");
        }

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: processedValue,
        }));
        // Validar el campo en tiempo real
        validateField(name, processedValue);
    };

    // * Manejar la carga de archivos con Dropzone
    const handleDrop = acceptedFiles => {
        const validarExtencion = acceptedFiles.filter(
            file =>
                file.type === 'image/jpeg' ||
                file.type === 'image/png' ||
                file.type === 'image/gif' ||
                file.type === 'image/jpg',
        );

        if (validarExtencion.length !== acceptedFiles.length) {
            toast.warn('Solo se permiten archivos JPG, PNG y GIF.');
        }
        setImagenNuevas(validarExtencion);
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: handleDrop,
        accept: 'image/jpeg, image/png, image/gif',
    });

    // * Manejar el envío del formulario
    const handleSubmit = async e => {
        e.preventDefault();
        try {
            setAnimacionSubmit(true);
            // * Validación de campos
            validarProductos.parse(formData);

            console.log(formData.categoria.id_categoria);
            console.log(typeof(formData.categoria.id_categoria));

            formData.categoria = formData.categoria.id_categoria === undefined ? formData.categoria : formData.categoria.id_categoria;

            // * Se formatean los datos para enviarlos por form-data
            const formDataToSend = new FormData();
            formDataToSend.append('nombre_producto', formData.nombre_producto);
            formDataToSend.append('marca', formData.marca);
            formDataToSend.append('precio', formData.precio);
            formDataToSend.append('id_categoria', parseInt(formData.categoria));
            formDataToSend.append('tipo_producto', formData.tipo_producto);
            // Agregar cada color individualmente si colores no es null
            if (formData.colores) {
                formData.colores.forEach((color, index) => {
                    formDataToSend.append('colores', color);
                });
            }

            // Agregar cada talla individualmente
            if (formData.tallas) {
                formData.tallas.forEach((talla, index) => {
                    formDataToSend.append('tallas', talla);
                });
            }

            // Se agreganlas imagenes
            imagenNuevas.forEach((file, index) => {
                formDataToSend.append(`imagen_producto`, file);
            });

            // * Enviar datos al endpoint
            const { status, dataResponse } = await putFormData(`${RUTA_API}/api/productos/${formData.id_producto}`, formDataToSend);
            if (status >= 200 && status < 300) {
                const { categoria, marca } = dataResponse.datos;
                setData((prevData) => prevData.map((dato) =>
                    dato.id_producto === id
                        ? { ...dato, nombre_producto: formData.nombre_producto, marca, categoria: categoria, precio: formData.precio }
                        : dato
                ));
                toast.success('Producto editado exitosamente');
                // onSuccess(); // <- Esto debería cerrar el modal
            } else {
                toast.warn(dataResponse.mensaje);
            }
        } catch (err) {
            if (err.errors) {
                const formErrors = err.errors.reduce((acc, error) => {
                    acc[error.path[0]] = error.message;
                    return acc;
                }, {});
                setErrors(formErrors);
            } else {
                toast.error('Problemas al editar el producto');
                console.error(err);
            }
        } finally {
            setAnimacionSubmit(false);
        }
    };

    // * Cargar de categorias
    const cargarCategorias = async () => {
        try {
            const { status, dataResponse } = await getData(
                `${RUTA_API}/api/categorias/estado/1`,
            );
            if (status >= 200 && status < 300) setCategorias(dataResponse.datos);
        } catch (error) {
            toast.error('Problemas al cargar las categorias (404)');
            console.error(error);
        }
    };

    // * Cargar las tallas
    const cargarTallas = async () => {
        try {
            const { status, dataResponse } = await getData(`${RUTA_API}/api/tallas`);
            if (status >= 200 && status < 300)
                setTallas(dataResponse.datos);
        } catch (error) {
            toast.error('Problemas al cargar las categorias (404)');
            console.error(error);
        }
    }

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
            }}
        >
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                <Box
                    sx={{
                        '& > :not(style)': { m: 1, width: '100%' },
                    }}
                    noValidate
                    autoComplete='off'
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            {isLoading ? (
                                <Skeleton />
                            ) : (
                                <Select
                                    name='categoria'
                                    label='Categoria'
                                    value={formData.categoria.id_categoria}
                                    variant='bordered'
                                    isRequired
                                    defaultSelectedKeys={[formData.categoria.id_categoria]}
                                    onChange={handleChange}
                                    isInvalid={!!errors.categoria}
                                    helperText={errors.categoria}
                                    errorMessage={errors.categoria}
                                    fullWidth
                                >
                                    {categorias.map(categoria => (
                                        <SelectItem
                                            key={categoria.id_categoria}
                                            value={categoria.id_categoria}
                                            className='capitalize'
                                        >
                                            {categoria.nombre_categoria}
                                        </SelectItem>
                                    ))}
                                </Select>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            {
                                isLoading ? (<Skeleton />)
                                    : (
                                        <Input
                                            type='text'
                                            variant='bordered'
                                            label='Nombre producto'
                                            name='nombre_producto'
                                            value={formData.nombre_producto}
                                            fullWidth
                                            isRequired
                                            isInvalid={!!errors.nombre_producto}
                                            onChange={handleChange}
                                            helperText={errors.nombre_producto}
                                            errorMessage={errors.nombre_producto}
                                        />
                                    )
                            }
                        </Grid>
                        <Grid item xs={12} md={6}>
                            {
                                isLoading ? (<Skeleton />)
                                    : (
                                        <Input
                                            type='number'
                                            variant='bordered'
                                            label='Precio'
                                            name='precio'
                                            value={formData.precio}
                                            fullWidth
                                            isRequired
                                            onChange={handleChange}
                                            isInvalid={!!errors.precio}
                                            helperText={errors.precio}
                                            errorMessage={errors.precio}
                                        />
                                    )
                            }
                        </Grid>
                        <Grid item xs={12} md={6}>
                            {
                                isLoading ? (<Skeleton />)
                                    : (
                                        <Input
                                            name='marca'
                                            value={formData.marca}
                                            label='Marca'
                                            variant='bordered'
                                            fullWidth
                                            isRequired
                                            onChange={handleChange}
                                            isInvalid={!!errors.marca}
                                            helperText={errors.marca}
                                            errorMessage={errors.marca}
                                        />
                                    )
                            }
                        </Grid>
                        <Grid item xs={12}>
                            {
                                isLoading ? (<Skeleton />) : (
                                    <Select
                                        name='tallas'
                                        label='Tallas'
                                        selectionMode="multiple"
                                        fullWidth
                                        variant='bordered'
                                        value={formData.tallas}
                                        selectedKeys={formData.tallas}
                                        onChange={handleChange}
                                    >
                                        {tallas.map(talla => (
                                            <SelectItem
                                                key={talla.talla}
                                                value={talla.talla}
                                            >
                                                {talla.talla}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                )
                            }
                        </Grid>
                        <Grid item xs={12}>
                            <div
                                {...getRootProps()}
                                className='rounded-2xl border text-center p-3 shadow-sm cursor-pointer'
                            >
                                <input {...getInputProps()} />
                                <p className="text-sm text-gray-500">
                                    Arrastra y suelta imágenes aquí, o haz clic para
                                    seleccionar imágenes
                                </p>
                            </div>
                            <div className='flex justify-evenly flex-wrap'>
                                {/* {imagenExistentes.map((file, index) => (
                                    <Card key={index} shadow='sm' className='m-2 size-20 hover:scale-[1.7]'>
                                        <CardBody className='overflow-visible p-0'>
                                            <Image
                                                shadow="sm"
                                                radius="lg"
                                                width="100%"
                                                alt={`previsualización ${index}`}
                                                className="w-full object-cover h-[140px] shadow-sm object-fill hover:object-cover"
                                                src={`${RUTA_API}/publico/productos_imagen/${file.nombre_imagen}`}
                                                title={file.nombre_imagen}
                                            />
                                        </CardBody>
                                    </Card>
                                ))} */}
                                {imagenNuevas.map((file, index) => (
                                    <Card key={index} shadow='sm' className='m-2 size-20 hover:scale-[1.7]'>
                                        <CardBody className='overflow-visible p-0'>
                                            <Image
                                                shadow="sm"
                                                radius="lg"
                                                width="100%"
                                                alt={`previsualización ${index}`}
                                                className="w-full object-cover h-[140px] shadow-sm object-fill hover:object-cover"
                                                src={URL.createObjectURL(file)}
                                                title={file.name}
                                            />
                                        </CardBody>
                                    </Card>
                                ))}
                            </div>
                            {/* <Carrusel imagenes={imagenExistentes} /> */}
                        </Grid>
                        {
                            formData.colores &&
                            <Grid
                                item
                                xs={12}
                                md={6}
                                style={{ display: 'flex', justifyContent: 'center' }}
                            >
                                <Modal
                                    titulo='Seleccionar colores'
                                    size='xl'
                                    tituloBoton='Asignar colores'
                                    iconBoton='palette'
                                    color='#FFFFFF'
                                    botonColor='primary'
                                    onClose={handleCloseModalColores}
                                >
                                    <Colores setForm={setFormData} formData={formData} />
                                </Modal>
                            </Grid>
                        }
                        <Grid
                            item
                            xs={12}
                            md={6}
                            style={{ display: 'flex', justifyContent: 'center' }}
                        >
                            {animacionSubmit ? (
                                <Button type='submit' color='primary' isLoading isDisabled>
                                    Guardando
                                </Button>
                            ) : (
                                <Button
                                    type='submit'
                                    color='primary'
                                    startContent={<Icon>save</Icon>}
                                >
                                    Guardar
                                </Button>
                            )}
                        </Grid>
                    </Grid>
                </Box>
            </form>
        </Box>
    );
}

export default EditarProducto;
