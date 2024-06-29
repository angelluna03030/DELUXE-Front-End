import imagen from '../../assets/OIP.jpg';
import { Titulo } from '../../components/Titulo';
import { Subtitulo } from '../../components/Subtitulo';
import { Descripcion } from '../../components/Descripcion';
import { Comprar,AgregarCarrito } from '../../components/Boton';

export const Producto = () => {
  return (
    <>
      <img src={imagen} alt="Imagen del producto" />
      <Titulo Titulo={'Productos #1'} />
      <Subtitulo Subtitulo={'hola mundo'} />
      <Descripcion Descripcion={'hola mundoso'} />
      <p>Tallas</p>
      <div className="days-btn-container">
        <input className="day-btn" id="monday" type="checkbox" defaultChecked={true} />
        <label className="day-label" htmlFor="monday">M</label>

        <input className="day-btn" id="tuesday" type="checkbox" defaultChecked={true} />
        <label className="day-label" htmlFor="tuesday">T</label>

        <input className="day-btn" id="wednesday" type="checkbox" defaultChecked={true} />
        <label className="day-label" htmlFor="wednesday">W</label>

        <input className="day-btn" id="thursday" type="checkbox" defaultChecked={true} />
        <label className="day-label" htmlFor="thursday">T</label>

        <input className="day-btn" id="friday" type="checkbox" defaultChecked={true} />
        <label className="day-label" htmlFor="friday">F</label>

      </div>


      <br />
      <div style={{
        display: 'flex',
        
      }} className='ml-6'>
         <AgregarCarrito />
 <Comprar/>

      </div>
     
    </>
  );
};
