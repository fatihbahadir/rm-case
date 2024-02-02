import React from 'react'

const LocationCard = ({ location }) => {
  return (
    <div className='w-full h-full border border-gray-300 rounded hover:scale-105 cursor-pointer duration-300'>
    <div className='bg-green w-full flex items-center justify-center min-h-[150px] font-bold tracking-wide text-2xl text-white'>
        {location.type}
    </div>
    <div className='p-5 flex flex-col'>
    <span className='text-xs'>{location.dimension}</span>
    <h1 className="text-xl font-bold">{location.name}</h1>
    </div>
    </div>
  )
}

export default LocationCard
