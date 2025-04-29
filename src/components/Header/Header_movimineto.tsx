import { Link } from 'react-router-dom';


export const HeaderMovimiento =()=>{
    return <>
     <nav className='w-screen bg-[#282828] h-fit overflow-hidden' id='princi'>
      <div className='py-4   h-14  text-white flex items-end justify-end  w-full'>
        <div className=' overflow-hidden whitespace-nowrap  w-full '>
          <Link to={'/'}>
          <h1 className='text-base font-light text-[#FFFAFA] font-sans tracking-wider cursor-pointer animate-marquee w-full mr-4'>
  <div className='mx-40'>  Envíos gratis por compras de $350.000 en adelante.</div>
  <div className='mx-40'>  Envíos gratis por compras de $350.000 en adelante.</div>
  <div className='mx-40'>  Envíos gratis por compras de $350.000 en adelante.</div>
</h1>

          </Link>
        </div>
      </div>
    </nav>
    </>
}