import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

// Material UI
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Next UI
import { Checkbox, Spinner, Card, CardBody, Button, Input } from "@nextui-org/react";

// Funciones para traer los colores
import { getData, postData, putData } from "../../../utils/api/metodosFetch";

import { validarColor } from "../../../utils/functions/productos.validaciones";

const RUTA_API = import.meta.env.VITE_API_URL;

const Colores = ({ setForm, formData }) => {
    // Animaciones
    const [loading, setLoading] = useState(true);
    const [animacionSubmit, setAnimacionSubmit] = useState(false);

    const [colores, setColores] = useState([]);

    // Manejar editar color
    const [editandoColor, setEditandoColor] = useState('');
    const [colorModificado, setColorModificado] = useState('');
    const [erroresColorModificado, setErroresColorModificado] = useState('');

    // Manejar crear color
    const [nuevoColor, setNuevoColor] = useState('');
    const [erroresNuevoColor, setErroresNuevoColor] = useState('');

    // * Colores seleccionados
    const handledSelectColor = (e) => {
        const { name, value } = e.target;
        const idColor = parseInt(value);

        const colorExistente = formData.colores.find(c => c === idColor);

        if (!colorExistente) {
            const nuevosColores = [...formData.colores, idColor];
            setForm(prevFormData => ({
                ...prevFormData,
                colores: nuevosColores
            }));
        } else {
            const nuevosColores = formData.colores.filter(c => c !== idColor);
            setForm(prevFormData => ({
                ...prevFormData,
                colores: nuevosColores
            }));
        }
    };

    // * Cargar colores
    const cargarColores = async () => {
        try {
            const { status, dataResponse } = await getData(`${RUTA_API}/api/colores`);
            if (status >= 200 && status < 300) setColores(dataResponse.datos);
        } catch (error) {
            toast.error('Problemas al cargar las categorias (404)');
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        cargarColores();
    }, []);

    // * Editar color
    const handleEditarClick = (color) => {
        setEditandoColor(color.id_color);
        setColorModificado(color.color);
    };

    const handleGuardarClick = (id_color) => {
        const validation = validarColor.safeParse({ color: colorModificado });
        if (validation.success) {
            setAnimacionSubmit(true);
            editarColor(id_color, colorModificado);
            setEditandoColor('');
            setErroresColorModificado('');
        } else {
            setErroresColorModificado(validation.error.errors[0].message);
        }
    };

    const handleCancelarClick = () => {
        setEditandoColor('');
        setErroresColorModificado('');
    };

    const handleColorModificadoChange = (e) => {
        const nuevoValor = e.target.value;
        setColorModificado(nuevoValor);

        const validation = validarColor.safeParse({ color: nuevoValor });
        if (!validation.success) {
            setErroresColorModificado(validation.error.errors[0].message);
        } else {
            setErroresColorModificado('');
        }
    };

    const editarColor = async (id_color, nuevoColorNombre) => {
        try {
            const { status, dataResponse } = await putData(`${RUTA_API}/api/colores/${id_color}`, { color: nuevoColorNombre });
            if (status >= 200 && status < 300) {
                toast.success("Color guardado correctamente");
                setColores((prevColores) =>
                    prevColores.map((color) =>
                        color.id_color === id_color ? { ...color, color: nuevoColorNombre } : color
                    )
                );
            }
            else toast.warn(dataResponse.mensaje);
        } catch (error) {
            toast.error("Problemas al editar el color");
            console.error(error);
        } finally {
            setAnimacionSubmit(false);
        }
    };

    // * Crear un color
    const handleRegistrarColorClick = () => {
        const validation = validarColor.safeParse({ color: nuevoColor });
        if (validation.success) {
            setAnimacionSubmit(true);
            registrarColor(nuevoColor);
            setNuevoColor('');
            setErroresNuevoColor('');
        } else {
            setErroresNuevoColor(validation.error.errors[0].message);
        }
    };

    const handleNuevoColorChange = (e) => {
        const nuevoValor = e.target.value;
        setNuevoColor(nuevoValor);

        const validation = validarColor.safeParse({ color: nuevoValor });
        if (!validation.success) {
            setErroresNuevoColor(validation.error.errors[0].message);
        } else {
            setErroresNuevoColor('');
        }
    };

    const registrarColor = async (colorRegistrar) => {
        try {
            const { status, dataResponse } = await postData(`${RUTA_API}/api/colores`, { color: colorRegistrar });
            if (status >= 200 && status < 300) {
                toast.success('Color registrado correctamente');
                setColores((prevColores) => [...prevColores, dataResponse.datos]);
            } else
                toast.warn(dataResponse.mensaje);

        } catch (error) {
            toast.error('Problemas al registrar el color');
            console.error(error);
        } finally {
            setAnimacionSubmit(false);
        }
    }

    return (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {
                loading
                    ? <div className="flex justify-center items-center">
                        <Spinner />
                    </div>
                    : colores.map(color => (
                        <Grid item xs={12} md={6} key={color.id_color}>
                            <Card>
                                <CardBody>
                                    <div className="flex justify-between">
                                        {editandoColor === color.id_color ? (
                                            <>
                                                <Input
                                                    type="color"
                                                    value={colorModificado}
                                                    onChange={handleColorModificadoChange}
                                                    status={erroresColorModificado ? 'error' : 'default'}
                                                    isInvalid={!!erroresColorModificado}
                                                    helperText={erroresColorModificado}
                                                    errorMessage={erroresColorModificado}
                                                    className={{
                                                        input: [
                                                            'padding: 2px'
                                                        ]
                                                    }}
                                                />
                                                <Button isIconOnly variant="light" onClick={() => handleGuardarClick(color.id_color)}>
                                                    {
                                                        animacionSubmit
                                                            ? <Spinner />
                                                            : <Icon fontSize="small">save</Icon>
                                                    }
                                                </Button>
                                                <Button isIconOnly variant="light" onClick={handleCancelarClick}>
                                                    <Icon fontSize="small">close</Icon>
                                                </Button>
                                            </>
                                        ) : (
                                            <>
                                                <Checkbox
                                                    name={color.color}
                                                    value={color.id_color}
                                                    isSelected={formData.colores.includes(color.id_color)}
                                                    onChange={handledSelectColor}
                                                >
                                                    <div className='w-full h-full p-4 rounded-full shadow-md' style={{backgroundColor: `${color.color}`}}></div>
                                                </Checkbox>
                                                <Button
                                                    isIconOnly
                                                    color="default"
                                                    label="Editar color"
                                                    variant="light"
                                                    onClick={() => handleEditarClick(color)}
                                                >
                                                    <Icon fontSize="small">edit</Icon>
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                </CardBody>
                            </Card>
                        </Grid>
                    ))
            }
            <Grid item xs={12} key="createColor">
                <Card>
                    <CardBody>
                        <div className="flex justify-between items-center">
                            <Input
                                type="color"
                                label="Crea un nuevo color"
                                value={nuevoColor}
                                onChange={handleNuevoColorChange}
                                placeholder="Nuevo color"
                                status={erroresNuevoColor ? 'error' : 'default'}
                                isInvalid={!!erroresNuevoColor}
                                helperText={erroresNuevoColor}
                                errorMessage={erroresNuevoColor}
                            />
                            <Button isIconOnly variant="light" onClick={handleRegistrarColorClick}>
                                {
                                    animacionSubmit
                                        ? <Spinner />
                                        : <Icon fontSize="small">save</Icon>
                                }
                            </Button>
                        </div>
                        <p className="text-sm mt-4">Marca los colores que quieres asignar al producto</p>
                    </CardBody>
                </Card>
            </Grid>
        </Grid>
    );
}

export default Colores;
