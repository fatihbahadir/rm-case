import React from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import Video from '../assets/videos/rm4.mp4'

const Home = () => {
  return (
    <div className='font-creepster text-white w-full h-screen bg-[linear-gradient(rgba(12,3,51,0.3),rgba(12,3,51,0.3))] relative px-0 py-[5%] flex items-center justify-center'>

        <video autoPlay loop muted playsInline className='absolute right-0 bottom-0 z-[-1] w-full h-full object-cover 2xl:w-full 2xl:h-auto'>
            <source src={Video} type='video/mp4' />
        </video>
        <Navbar isMain={true}/>
        <div data-aos="fade-up" data-aos-delay="1000" className='text-center'>
            <h1  className='text-[50px] main-text md:text-[80px] xl:text-[160px] font-semibold nav-heading transition-all duration-300 text-green tracking-wider '>Rick And Morty</h1>
            <Link to={'/episodes'} className='inline-block  text-[24px] hover:text-themeYellow hover:bg-transparent border-2 border-themeYellow py-[14px] px-[70px] rounded-[50px] mt-[20px] bg-themeYellow text-green duration-300'>Explore</Link>
        </div>
    </div>
  )
}

export default Home
