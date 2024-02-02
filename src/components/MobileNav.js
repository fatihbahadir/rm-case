import React from 'react'
import { nav } from '../data/data'

const MobileNav = ({setMobileNav}) => {
  return (
    <div className='bg-green w-full h-full z-[998]'>
    <ul className='h-screen bg-green flex flex-col justify-center items-center gap-y-8'>
      {
          nav.map((item, index)=>(
              <li key={index}>
               <a onClick={()=>setMobileNav(false)} className='link text-white text-xl' href={item.href}>{item.name}</a>
              </li>
          ))
      }
    </ul>
  </div>
  )
}

export default MobileNav
