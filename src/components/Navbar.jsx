import React from 'react'
import { useState } from 'react';
import { CgMenuGridO } from "react-icons/cg";
import { RiEyeCloseFill } from "react-icons/ri";
import { Link, NavLink } from 'react-router-dom';
import Footer from './Footer';

const Navbar = ({ textColor }) => {
  // open dropdown menu
  const [menu, setmenu] = useState('translate-x-[100%]')
  const openMenu = () => {
    setmenu('translate-x-[0%]')
  }
  // close dropdown menu
  const closeMenu = () => {
    setmenu('translate-x-[100%]')
  }
  return (
    <>
      <nav className='fixed top-0 left-0 z-[1000] w-screen h-16 flex items-center justify-center backdrop-blur-md'>
        <div className="nav-logo w-[60%] sm:w-[40%] md:w-[50%] h-full flex items-center justify-center">
          <Link to='/' style={{ color: textColor }} className='text-2xl font-semibold sm:text-3xl'>Venue Buddy</Link>
        </div>
        <div className="nav-links w-[40%] sm:w-[60%] md:w-[50%] h-full flex items-center justify-center">
          <h1 style={{ color: textColor }} className='menu-icon text-2xl font-extrabold sm:hidden cursor-grab active:cursor-grabbing' onClick={openMenu}>
            <CgMenuGridO />
          </h1>
          <ul className='hidden sm:flex items-center justify-center gap-5'>
            <NavLink to='/Deshboard' className={({ isActive }) => `text-2xl font-semibold my-4 sm:text-[1.2rem] transition-all duration-300 ${isActive ? 'text-[blueviolet]' : 'text-white'}`}>Deshboard</NavLink>
            <NavLink to='/Login' className={({ isActive }) => `text-2xl font-semibold my-4 sm:text-[1.2rem] transition-all duration-300 ${isActive ? 'text-[blueviolet]' : 'text-white'}`}>Login</NavLink>
            <NavLink to='/Contact' className={({ isActive }) => `text-2xl font-semibold my-4 sm:text-[1.2rem] transition-all duration-300 ${isActive ? 'text-[blueviolet]' : 'text-white'}`}>Contact Us</NavLink>
            <NavLink to='/' className={({ isActive }) => `text-2xl font-semibold my-4 sm:text-[1.2rem] transition-all duration-300 ${isActive ? 'text-[blueviolet]' : 'text-white'}`}>Home</NavLink>
          </ul>
        </div>
      </nav>
      <div onClick={closeMenu} className={`fixed top-0 right-0 ${menu} z-[1001] drop-menu w-[80%] h-screen bg-black flex flex-col justify-center items-center transition-all duration-300 linear`}>
        <div className="close w-full h-[10%] flex items-center justify-end !pr-[15px]">
          <h1 className='text-white bg-[blueviolet] !p-[5px] rounded text-2xl cursor-grab active:cursor-grabbing' onClick={closeMenu}><RiEyeCloseFill /></h1>
        </div>
        <div className="navlinks w-full h-[80%] flex items-center justify-center flex-col">
          <ul className='flex items-center justify-center flex-col gap-5'>
            <NavLink to='/Deshboard' className={({ isActive }) => `text-2xl font-semibold my-4 sm:text-[1.2rem] transition-all duration-300 ${isActive ? 'text-[blueviolet]' : 'text-white'}`}>Deshboard</NavLink>
            <NavLink to='/Login' className={({ isActive }) => `text-2xl font-semibold my-4 sm:text-[1.2rem] transition-all duration-300 ${isActive ? 'text-[blueviolet]' : 'text-white'}`}>Login</NavLink>
            <NavLink to='/Contact' className={({ isActive }) => `text-2xl font-semibold my-4 sm:text-[1.2rem] transition-all duration-300 ${isActive ? 'text-[blueviolet]' : 'text-white'}`}>Contact Us</NavLink>
            <NavLink to='/' className={({ isActive }) => `text-2xl font-semibold my-4 sm:text-[1.2rem] transition-all duration-300 ${isActive ? 'text-[blueviolet]' : 'text-white'}`}>Home</NavLink>
          </ul>
        </div>
        <Footer bgColor='black' />
      </div>
    </>
  )
}

export default Navbar