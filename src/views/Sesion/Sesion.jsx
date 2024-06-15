import React from 'react';

export const Sesion = () => {
  return (
    <div className='max-w-sm relative flex flex-col p-4 rounded-md text-black bg-[#F2E6D6] m-auto mt-36 md:max-w-md md:mt-34 lg:mt-24 xl:mt-24 2xl:mr-2 2xl:ml-2 2xl:mt-24'>
      <div className='text-xl md:text-2xl font-bold mb-2 text-[#1e0e4b] text-center'>
        Bienvenida <span className='text-[#7747ff]'>Marisol</span>
      </div>
      <div className='text-xs md:text-sm font-normal mb-4 text-center text-[#1e0e4b]'>
        Inicia sesión en tu cuenta
      </div>
      <form className='flex flex-col gap-2 md:gap-3 lg:gap-4 xl:gap-5'>
        <div className='block relative'>
          <label
            htmlFor='email'
            className='block text-gray-600 cursor-text text-xs md:text-sm leading-[140%] font-normal mb-2'
          >
            Email
          </label>
          <input
            type='email'
            id='email'
            className='rounded border border-gray-200 text-xs md:text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-10 md:h-11 m-0 p-[10px] md:p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0'
            required
          />
        </div>
        <div className='block relative'>
          <label
            htmlFor='password'
            className='block text-gray-600 cursor-text text-xs md:text-sm leading-[140%] font-normal mb-2'
          >
            Contraseña
          </label>
          <input
            type='password'
            id='password'
            className='rounded border border-gray-200 text-xs md:text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-10 md:h-11 m-0 p-[10px] md:p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0'
            required
          />
        </div>
        <div>
          <a
            className='text-xs md:text-sm text-[#7747ff]'
            href='https://wa.me/573213754980?text=Angel%2C%20olvid%C3%A9%20mi%20contrase%C3%B1a'
          >
            ¿Olvidaste tu contraseña?
          </a>
        </div>
        <button
          type='submit'
          className='bg-[#7747ff] w-max m-auto px-4 py-2 md:px-6 md:py-2 rounded text-white text-xs md:text-sm font-normal hover:bg-[#5a37cc] transition-colors duration-200'
        >
          ENTRAR
        </button>
      </form>
    </div>
  );
};
