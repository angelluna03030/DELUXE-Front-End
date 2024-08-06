import {  IconsConfirmar} from "./index"
export const BotonHacerPedido = ()=>{
    return <>
            <div className='flex justify-around items-center py-3'>
          <div className='flex gap-2 text-gray-600 hover:scale-110 duration-200 hover:cursor-pointer'>
            <IconsConfirmar></IconsConfirmar>
            <button className='font-semibold text-sm text-green-700'>
              Hacer Pedidos
            </button>
          </div>
        </div>
    </>
}