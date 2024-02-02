import React from 'react'
import { Link } from 'react-router-dom'

const NavLink = ({isMain, location, text}) => {
  return (
                  <li className='relative group transition-all duration-300'>
                <Link className={`${isMain && 'nav-link tracking-wider text-3xl'} text-green transition-all`} to={location}>
                    {text}
                    {
                        !isMain &&
                        <div className="absolute inset-x-0 bottom-0 w-0 h-0.5 bg-green group-hover:w-full transition-all duration-300"></div>
                    }
                </Link>
            </li>
  )
}

export default NavLink
