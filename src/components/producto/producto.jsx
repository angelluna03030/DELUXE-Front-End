import React from 'react';

export const Producto = () => {
  return (
    <div className='container mx-auto p-4 lg:min-h-screen flex items-center justify-center'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {/* Producto 1 */}
        <div className='max-w-xs sm:max-w-sm mx-auto relative shadow-md rounded-lg cursor-pointer'>
          <img
            src='https://images.unsplash.com/photo-1516205651411-aef33a44f7c2?auto=format&fit=crop&q=80&w=1528&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            alt='Img by Meriç Dağlı https://unsplash.com/@meric'
            className='w-full h-auto object-cover rounded-lg'
          />
          <div className='absolute bottom-0 left-0 right-0 h-36 sm:h-40 bg-black bg-opacity-50 backdrop-blur text-white p-4 rounded-b-lg'>
            <h1 className='text-lg sm:text-2xl font-semibold'>Nature Image</h1>
            <p className='mt-1 sm:mt-2'>
              This is a beautiful nature image placeholder. You can replace it
              with your own image.
            </p>
          </div>
        </div>

        {/* Producto 2 */}
        <div className='max-w-xs sm:max-w-sm mx-auto relative shadow-md rounded-lg cursor-pointer'>
          <img
            src='https://images.unsplash.com/photo-1516205651411-aef33a44f7c2?auto=format&fit=crop&q=80&w=1528&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            alt='Img by Meriç Dağlı https://unsplash.com/@meric'
            className='w-full h-auto object-cover rounded-lg'
          />
          <div className='absolute bottom-0 left-0 right-0 h-36 sm:h-40 bg-black bg-opacity-50 backdrop-blur text-white p-4 rounded-b-lg'>
            <h1 className='text-lg sm:text-2xl font-semibold'>Nature Image</h1>
            <p className='mt-1 sm:mt-2'>
              This is a beautiful nature image placeholder. You can replace it
              with your own image.
            </p>
          </div>
        </div>

        {/* Producto 3 */}
        <div className='max-w-xs sm:max-w-sm mx-auto relative shadow-md rounded-lg cursor-pointer'>
          <img
            src='https://images.unsplash.com/photo-1516205651411-aef33a44f7c2?auto=format&fit=crop&q=80&w=1528&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            alt='Img by Meriç Dağlı https://unsplash.com/@meric'
            className='w-full h-auto object-cover rounded-lg'
          />
          <div className='absolute bottom-0 left-0 right-0 h-36 sm:h-40 bg-black bg-opacity-50 backdrop-blur text-white p-4 rounded-b-lg'>
            <h1 className='text-lg sm:text-2xl font-semibold'>Nature Image</h1>
            <p className='mt-1 sm:mt-2'>
              This is a beautiful nature image placeholder. You can replace it
              with your own image.
            </p>
          </div>
        </div>

        {/* Producto 4 */}
        <div className='max-w-xs sm:max-w-sm mx-auto relative shadow-md rounded-lg cursor-pointer'>
          <img
            src='https://images.unsplash.com/photo-1516205651411-aef33a44f7c2?auto=format&fit=crop&q=80&w=1528&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            alt='Img by Meriç Dağlı https://unsplash.com/@meric'
            className='w-full h-auto object-cover rounded-lg'
          />
          <div className='absolute bottom-0 left-0 right-0 h-36 sm:h-40 bg-black bg-opacity-50 backdrop-blur text-white p-4 rounded-b-lg'>
            <h1 className='text-lg sm:text-2xl font-semibold'>Nature Image</h1>
            <p className='mt-1 sm:mt-2'>
              This is a beautiful nature image placeholder. You can replace it
              with your own image.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
