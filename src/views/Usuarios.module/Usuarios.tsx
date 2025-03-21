import { Navegacion } from '../../components/Nav';

import { TablaUsuarios } from './TablaUsuario';
export const Usuarios = () => {
  return (
    <>
      <div className='flex flex-col md:flex-row'>
        <Navegacion />
        <div className='w-full mt-6 flex justify-center'>
          <div className='sm:w-full sm:max-w-6xl sm:mr-32'>
            <TablaUsuarios />
          </div>
        </div>
      </div>
    </>
  );
};
