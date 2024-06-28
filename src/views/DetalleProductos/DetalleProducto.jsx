import imagen from '../../assets/OIP.jpg';
import { Titulo } from '../../components/Titulo';
import { Subtitulo } from '../../components/Subtitulo';
import { Descripcion } from '../../components/Descripcion';
import { Tallas } from '../../components/Tallas';
import { Boton } from '../../components/Boton';

export const DetalleProducto = () => {
  return (
    <>
      {/* biome-ignore lint/a11y/useAltText: <explanation> */}
      <img src={imagen} />
      <Titulo Titulo={'Productos #1'} />
      <Subtitulo Subtitulo={'hola mundo'} />
      <Descripcion Descripcion={'hola mundoso'} />
      <p>Tallas</p>
      <Tallas />
      <Boton titulo={'hola mundo'} />
      <br />
      <Boton titulo={'otro boton'} estilos={{}} estilosClass='bg-zinc-600' />
    </>
  );
};
