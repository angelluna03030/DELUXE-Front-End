export const CardCategoria=({ imageSrc, price, name })=>{
    return <>
    <div className="max-w-md rounded overflow-hidden shadow-lg max-h-min transform cursor-pointer place-items-center rounded-xl border border-blue-gray-50 bg-white  transition-all hover:scale-105 hover:border-blue-gray-100 hover:bg-blue-gray-50 hover:bg-opacity-25">
      <img className="w-full" src={imageSrc} alt={name} />
      <div className="px-4 py-4">
        <div className=" text-xl mb-1">{name}</div>
        <p className="text-[#9c9c9c] text-base">$ {price}</p>
      </div>
    </div>
    </>
}