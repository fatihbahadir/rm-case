import React from 'react'
import { useNavigate } from 'react-router-dom'

const EpisodeCart = ({ episode }) => {
  const navigate = useNavigate();
  return (
    <div onClick={()=>navigate(`/episode/${episode.id}`)} className='w-full h-full border border-gray-300 rounded hover:scale-105 cursor-pointer duration-300'>
    <div className='bg-green w-full flex items-center justify-center min-h-[150px] font-bold tracking-wide text-2xl text-white'>
        {episode.episode}
    </div>
    <div className='p-5 flex flex-col'>
    <span className='text-xs'>{episode.air_date}</span>
    <h1 className="text-xl font-bold">{episode.name}</h1>
    </div>
    </div>
  )
}

export default EpisodeCart
