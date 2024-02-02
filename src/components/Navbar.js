import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import NavLink from "./NavLink";
import { HiMenuAlt4, HiOutlineX } from "react-icons/hi";
import MobileNav from "./MobileNav";
import { nav } from "../data/data";
import { useSelector } from "react-redux";
import { selectFavorites } from "../redux/characterSlice";

// episodes, characters, locations, main

const Navbar = ({ isMain }) => {
  const [mobileNav, setMobileNav] = useState(false);
  const favorites = useSelector(selectFavorites);

  return (
    <nav
      data-aos={`${isMain && "flip-left"}`}
      data-aos-delay="600"
      className={`w-full px-5 xl:px-0 z-[998] fixed top-0 left-0 py-5 ${
        !isMain ? "border-b text-black bg-white" : "text-green"
      }`}
    >
      <div className="container w-full flex items-center justify-between m-auto">
        <Link to={'/'} className="font-creepster text-2xl xl:text-4xl 2xl:text-5xl hover:tracking-widest duration-300 tracking-wide text-green nav-heading">
          Rick And Morty
        </Link>
        <ul
          className={`gap-12 items-center hidden lg:flex ${
            isMain ? "text-2xl 2xl:text-3xl" : "text-lg font-bold"
          }`}
        >
            {
                nav.map((n)=>(
                    <NavLink key={n.href} isMain={isMain} location={n.href} text={n.name} />

                ))
            }
      
          {!isMain && (
            <li className="transition-all duration-300">
              <Link to={'/favs'} className="relative text-green hover:text-red-600 duration-300">
                <FaHeart className="w-[2.5rem] h-[2.5rem]" />
                <span className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%]  text-white w-6 h-6 text-[1rem] flex items-center justify-center rounded-full">
                  {favorites.length}
                </span>
              </Link>
            </li>
          )}
        </ul>
        <button
          className="lg:hidden"
          onClick={() => setMobileNav(!mobileNav)}
        >
          {mobileNav ? (
            <HiOutlineX className="text-3xl text-green " />
          ) : (
            <HiMenuAlt4 className="text-3xl text-green " />
          )}
        </button>

        <div
          className={`${
            mobileNav ? "left-0" : "-left-full"
          } fixed top-0 bottom-0 w-[60vw] lg:hidden trainsition-all
         transition-all duration-300`}
        >
          <MobileNav setMobileNav={setMobileNav} />
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
