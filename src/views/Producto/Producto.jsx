import { Layout } from '../../components/Layout';
import { Buscador } from '../../components/Inputs';
import { Footer } from '../../components/Footer';
import { Titulo } from '../../components/Titulo';
import { Subtitulo } from '../../components/Subtitulo';
import { Descripcion } from '../../components/Descripcion';
import { Comprar, AgregarCarrito } from '../../components/Boton';
import { GaleriaProductos } from '../../components/GaleriaProducto';
import { Color } from '../../components/Color';
import {useState}from "react"
import {CarritoComprasIcono} from "../CarritoComprar/IconoCarritoCompras"
export const Producto = () => {
  const [selectedColor, setSelectedColor] = useState(null);

  const handleSelectColor = (color) => {
    setSelectedColor(color);
  };

 const [selectedTalla
, setselectedTalla
] = useState(null);

  const handleSelect = (size) => {
    setselectedTalla
(size);
  };
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

      <div className='space-y-4'>
  <div className='grid grid-cols-6 gap-4 '>
    <div className='flex items-center space-x-2 '>
      <input
        className='day-btn'
        id='size-s'
        type='checkbox'
        checked={selectedTalla
 === 'S'}
        onChange={() => handleSelect('S')}
      />
      <label className='day-label' htmlFor='size-s'>
        S
      </label>
    </div>
    <div className='flex items-center space-x-2'>
      <input
        className='day-btn'
        id='size-m'
        type='checkbox'
        checked={selectedTalla
 === 'M'}
        onChange={() => handleSelect('M')}
      />
      <label className='day-label' htmlFor='size-m'>
        M
      </label>
    </div>
    <div className='flex items-center space-x-2'>
      <input
        className='day-btn'
        id='size-l'
        type='checkbox'
        checked={selectedTalla
 === 'L'}
        onChange={() => handleSelect('L')}
      />
      <label className='day-label' htmlFor='size-l'>
        L
      </label>
    </div>



    <div className='flex items-center space-x-2'>
      <input
        className='day-btn'
        id='size-xl'
        type='checkbox'
        checked={selectedTalla
 === 'XL'}
        onChange={() => handleSelect('XL')}
      />
      <label className='day-label' htmlFor='size-xl'>
        XL
      </label>
    </div>
  </div>

  <div>
    <p className='text-lg ml-4'>Colores</p>
  </div>

  <div className='grid grid-cols-6 gap-4 ml-2'>
    <Color color={'#F2E6D6'} isSelected={selectedColor === '#F2E6D6'} onSelect={handleSelectColor} />
    <Color color={'#363183'} isSelected={selectedColor === '#363183'} onSelect={handleSelectColor} />
    <Color color={'#030303'} isSelected={selectedColor === '#030303'} onSelect={handleSelectColor} />
    <Color color={'#317983'} isSelected={selectedColor === '#317983'} onSelect={handleSelectColor} />
   
  </div>
</div>

<div className='mt-4 flex ml-6'>
  <AgregarCarrito />
  <Comprar />
  <CarritoComprasIcono/>
</div>

      <Footer />
  
    </>
  );
};
