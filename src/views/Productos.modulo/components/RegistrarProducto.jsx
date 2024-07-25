import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDropzone } from 'react-dropzone';

// Material UI
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Icon from '@mui/material/Icon';

// Next UI
import { Input, Button, Select, SelectItem, Skeleton, Image, Card, CardBody } from '@nextui-org/react';

// Componentes
import Modal from '../../../components/Modal';
import Colores from './Colores';

// Funciones
import { validarProductos } from '../../../utils/functions/productos.validaciones';
import { getData, postFormData } from '../../../utils/api/metodosFetch';

const RUTA_API = import.meta.env.VITE_API_URL;

const RegistrarProducto = ({ onSuccess, setData }) => {

    // Estado inicial del formulario y los errores
    const [formData, setFormData] = useState({
        nombre_producto: '',
        marca: '',
        precio: '',
        categoria: '',
        tipo_producto: '',
        imagen_productos: [],
        colores: [],
        tallas: [],
    });
    const [categorias, setCategorias] = useState([]);
    const [tallas, setTallas] = useState([]);
    const [errors, setErrors] = useState({});
    const [animacionSubmit, setAnimacionSubmit] = useState(false);
    const [isLoading, setLoading] = useState(true);

    // * Controladores de modal colores
    const [modalColores, setModalColores] = useState(false);
    const handleCloseModalColores = () => setModalColores(false);

    // Validar el formulario
    const validateField = (name, value) => {
        try {
            validarProductos.pick({ [name]: true }).parse({ [name]: value });
            setErrors(prevErrors => ({
                ...prevErrors,
                [name]: null,
            }));
        } catch (err) {
            setErrors(prevErrors => ({
                ...prevErrors,
                [name]: err.errors[0].message,
            }));
        }
    };

    // * Funcion del evento change
    const handleChange = (name, value) => {
        let processedValue = name === 'precio' ? parseInt(value) : value;
        processedValue = name === 'categoria' ? parseInt(value) : value;
        // Si el campo es 'tallas' y tiene múltiples valores, actualiza el estado como una lista de IDs
        if (name === 'tallas') {
            processedValue = value.split(",");
        }

        setFormData(prevFormData => ({
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
        setFormData(prevFormData => ({
            ...prevFormData,
            imagen_productos: validarExtencion,
        }));
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
            // * Se formatean los datos para enviarlos por form-data
            const formDataToSend = new FormData();
            formDataToSend.append('nombre_producto', formData.nombre_producto);
            formDataToSend.append('marca', formData.marca);
            formDataToSend.append('precio', formData.precio);
            formDataToSend.append('id_categoria', formData.categoria);
            formDataToSend.append('tipo_producto', formData.tipo_producto);
            // Agregar cada color individualmente si colores no es null
            if (formData.colores) {
                formData.colores.forEach((color, index) => {
                    formDataToSend.append('colores', color);
                });
            }
            // Se agregan las imagenes
            formData.imagen_productos.forEach((file, index) => {
                formDataToSend.append(`imagen_producto`, file);
            });

            // Agregar cada talla individualmente
            if (formData.tallas) {
                formData.tallas.forEach((talla, index) => {
                    formDataToSend.append('tallas', talla);
                });
            }
            // * Enviar datos al endpoint
            const { status, dataResponse } = await postFormData(
                `${RUTA_API}/api/productos`,
                formDataToSend,
            );
            if (status >= 200 && status < 300) {
                setData(prevData => [dataResponse.datos, ...prevData]);
                toast.success('Producto registrado exitosamente');
                onSuccess(); // <- Esto debería cerrar el modal
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
                toast.error('Problemas al registrar el producto');
                console.error(err);
            }
        } finally {
            setAnimacionSubmit(false);
        }
    };

    // * Carga de categorias
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

    useEffect(() => {
        cargarCategorias();
        cargarTallas();
        setLoading(false);
    }, []);

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
                        <Grid item xs={12} md={6}>
                            {isLoading ? (
                                <Skeleton />
                            ) : (
                                <Select
                                    name='categoria'
                                    label='Categoria'
                                    value={formData.categoria}
                                    variant='bordered'
                                    selectedKeys={[formData.categoria]}
                                    isRequired
                                    onChange={(e) => handleChange(e.target.name, e.target.value)}
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
                        <Grid item xs={12} md={6}>
                            <Select
                                name='tipo_producto'
                                label='Tipo de producto'
                                value={formData.tipo_producto}
                                variant='bordered'
                                isRequired
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                                isInvalid={!!errors.tipo_producto}
                                helperText={errors.tipo_producto}
                                errorMessage={errors.tipo_producto}
                                fullWidth
                            >
                                <SelectItem
                                    value={0}
                                    key={0}
                                    startContent={<Icon>shopping_bag</Icon>}
                                >
                                    Tipo producto
                                </SelectItem>
                                <SelectItem
                                    value={1}
                                    key={1}
                                    startContent={<Icon>fastfood</Icon>}
                                >
                                    Tipo perecedero
                                </SelectItem>
                                <SelectItem
                                    value={2}
                                    key={2}
                                    startContent={<Icon>checkroom</Icon>}
                                >
                                    Tipo prenda
                                </SelectItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12}>
                            <Input
                                type='text'
                                variant='bordered'
                                label='Nombre producto'
                                name='nombre_producto'
                                value={formData.nombre_producto}
                                fullWidth
                                isRequired
                                isInvalid={!!errors.nombre_producto}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                                helperText={errors.nombre_producto}
                                errorMessage={errors.nombre_producto}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Input
                                type='number'
                                variant='bordered'
                                label='Precio'
                                name='precio'
                                value={formData.precio}
                                fullWidth
                                isRequired
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                                isInvalid={!!errors.precio}
                                helperText={errors.precio}
                                errorMessage={errors.precio}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Input
                                name='marca'
                                value={formData.marca}
                                label='Marca'
                                variant='bordered'
                                fullWidth
                                isRequired
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                                isInvalid={!!errors.marca}
                                helperText={errors.marca}
                                errorMessage={errors.marca}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Select
                                name='tallas'
                                label='Tallas'
                                selectionMode="multiple"
                                fullWidth
                                variant='bordered'
								// selectedKeys={formData.tallas}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
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
                                {formData.imagen_productos.map((file, index) => (
                                    <Card key={index} shadow='sm' className='m-2 size-20 hover:scale-[1.7]'>
                                        <CardBody className='overflow-visible p-0'>
                                            <Image
                                                shadow="sm"
                                                radius="lg"
                                                width="100%"
                                                alt={`previsualización ${index}`}
                                                className="w-full object-cover h-[140px] shadow-sm object-fill hover:object-cover"
                                                src={URL.createObjectURL(file)}
                                                title={`${file.name}`}
                                            />
                                        </CardBody>
                                    </Card>
                                ))}
                            </div>
                        </Grid>
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
                        <Grid
                            item
                            xs={12}
                            md={6}
                            style={{ display: 'flex', justifyContent: 'center' }}
                        >
                            {animacionSubmit ? (
                                <Button type='submit' color='primary' isLoading isDisabled>
                                    Registrando
                                </Button>
                            ) : (
                                <Button
                                    type='submit'
                                    color='primary'
                                    startContent={<Icon>send</Icon>}
                                >
                                    Registrar
                                </Button>
                            )}
                        </Grid>
                    </Grid>
                </Box>
            </form>
        </Box>
    );
};

export default RegistrarProducto;
