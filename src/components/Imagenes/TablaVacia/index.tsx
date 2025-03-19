import React from 'react';
import EmptyImage from '../../../assets/4891590.jpg';
import { Image } from '@nextui-org/react';

export const TablaVaciaImagen = () => (
  <div
    style={{
      textAlign: 'center',
      padding: '20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    }}
  >
    <Image src={EmptyImage} alt='No data available' style={{ width: '200px' }} />
    <p>No hay nada por ahora</p>
  </div>
);
