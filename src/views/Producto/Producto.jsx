import { Layout } from '../../components/Layout';
import { Buscador } from '../../components/Inputs';
import { Footer } from '../../components/Footer';
import { Titulo } from '../../components/Titulo';
import { Subtitulo } from '../../components/Subtitulo';
import { Descripcion } from '../../components/Descripcion';
import { Comprar, AgregarCarrito } from '../../components/Boton';
import { GaleriaProductos } from '../../components/GaleriaProducto';
import { Color } from '../../components/Color';
export const Producto = () => {
  return (
    <>
      <Layout />
      <Buscador />
      <GaleriaProductos />
      <div
        style={{
          display: 'flex',
        }}
        className='ml-6'
      >
        <Titulo titulo={'Productos #1'} precio={12000} />
      </div>
      <br />
      <Descripcion
        descripcion={
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint ut quidem voluptates quasi, doloremque voluptatum repellendus omnis minima. Explicabo reiciendis sint ipsum tenetur atque mollitia illo magnam voluptates dicta inventore.'
        }
      />
      <br />

      <p className=' text-lg ml-4'>Tallas</p>
      <br />

      <div className='days-btn-container'>
        <input
          className='day-btn'
          id='monday'
          type='checkbox'
          defaultChecked={true}
        />
        <label className='day-label' htmlFor='monday'>
          M
        </label>

        <input
          className='day-btn'
          id='tuesday'
          type='checkbox'
          defaultChecked={true}
        />
        <label className='day-label' htmlFor='tuesday'>
          T
        </label>

        <input
          className='day-btn'
          id='wednesday'
          type='checkbox'
          defaultChecked={true}
        />
        <label className='day-label' htmlFor='wednesday'>
          W
        </label>

        <input
          className='day-btn'
          id='thursday'
          type='checkbox'
          defaultChecked={true}
        />
        <label className='day-label' htmlFor='thursday'>
          T
        </label>

        <input
          className='day-btn'
          id='friday'
          type='checkbox'
          defaultChecked={true}
        />
        <label className='day-label' htmlFor='friday'>
          F
        </label>
      </div>

      <br />
      <p className=' text-lg ml-4'>Colors</p>
      <br />

      <div className='days-btn-container'>
        <Color color={'#F2E6D6'} />
        <Color color={'#363183'} />
        <Color color={'#030303'} />
        <Color color={'#317983'} />
      </div>
      <br />

      <div
        style={{
          display: 'flex',
        }}
        className='ml-6'
      >
        <AgregarCarrito />
        <Comprar />
      </div>
      <Footer />
    </>
  );
};
