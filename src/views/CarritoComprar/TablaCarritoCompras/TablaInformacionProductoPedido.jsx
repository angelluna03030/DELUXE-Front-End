import { useContext } from 'react';
import { CarritoContext } from '../../../states/context/ContextCarrito';
export const TablaInformacionProductoPedido = () => {
  const { carrito, eliminarProducto, actualizarCantidad } =
    useContext(CarritoContext);
  const Decremento = producto => {
    if (producto.cantidad > 1) {
      actualizarCantidad(producto.id, producto.cantidad - 1);
    } else {
      eliminarProducto(producto.id);
    }
  };

  const Incremento = producto => {
    producto.cantidad < 10
      ? actualizarCantidad(producto.id, producto.cantidad + 1)
      : toast.warn(
          'Estás haciendo un pedido más allá del límite recomendado que es 10.',
        );
  };

  const CambioCantidad = (e, producto) => {
    const value = Number.parseInt(e.target.value);
    if (!Number.isNaN(value) && value >= 1 && value <= 10) {
      actualizarCantidad(producto.id, value);
    }
  };
  return (
    <>
      <table className='table table-light table-borderless table-hover text-center mb-0'>
        <thead className='thead-dark'>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Total</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody className='align-middle'>
          {carrito.map(item => (
            <tr key={item.id}>
              <td className='align-middle'>
                <p>{item.nombre}</p>
              </td>
              <td className='align-middle'>
                <p>{item.imagenes}</p>
              </td>
              <td className='align-middle'>${item.precio}</td>
              <td className='align-middle'>
                <div
                  className='input-group quantity mx-auto'
                  style={{ width: '100px' }}
                >
                  <div className='input-group-btn'>
                    <button
                      className='btn btn-sm btn-minus'
                      onClick={() => Decremento(item)}
                    >
                      <i className='fa fa-minus' />
                    </button>
                  </div>
                  <input
                    className='form-control form-control-sm bg-secondary border-0 text-center'
                    value={item.cantidad}
                    onChange={e => CambioCantidad(e, item)}
                  />
                  <div className='input-group-btn'>
                    <button
                      className='btn btn-sm btn-plus'
                      onClick={() => Incremento(item)}
                    >
                      <i className='fa fa-plus' />
                    </button>
                  </div>
                </div>
              </td>
              <td className='align-middle'>${item.precio * item.cantidad}</td>
              <td className='align-middle'>
                <button
                  className='btn btn-sm btn-danger'
                  onClick={() => eliminarProducto(item.id)}
                >
                  <i className='fa fa-times' />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
