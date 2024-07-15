import React from 'react';
import imagen from '../../../assets/imagen.svg'; // Asegúrate de que esta ruta sea correcta

export const TargetImagen = () => {
    return (
        <label className="custum-file-upload" htmlFor="file">
<div className="icon">
                <img src={imagen} alt="icono" width={100}/>
            </div>
            <div className="text">
                <span>Haz clic para subir la imagen</span>
            </div>
            <input type="file" id="file" multiple accept="image/*" style={{ display: 'none' }} />
        </label>
    );
};
