import EmptyImage from '../../assets/fregar.png';
import { Image } from '@nextui-org/react';

export const TablaVaciaImagen = () => (
<div
  style={{
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100vh', // Esto asegura que el contenedor ocupe toda la altura de la pantalla
    width: '100vw', // Esto asegura que el contenedor ocupe toda la anchura de la pantalla
  }}
  className="flex justify-center items-center h-screen w-screen"
>
  <Image src={EmptyImage} alt="No data available" style={{ width: '200px' }} />
  <p>No hay nada por ahora</p>
</div>

);
