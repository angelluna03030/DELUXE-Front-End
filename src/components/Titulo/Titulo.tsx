import { formatearNumero } from '../../states/function';
interface TituloProps {
  titulo: string;
  precio: number;
}

export const Titulo: React.FC<TituloProps> = ({ titulo, precio }) => {
  return (
    <div className='flex justify-between items-center p-1 w-full mt-4 text-xl font-semibold text-start sm:text-2xl  text-wrap'>
      <div className=' flex-grow'>{titulo}</div>
      <div className=" text-left mr-8">${formatearNumero(precio)}</div>
    </div>
  );
};
