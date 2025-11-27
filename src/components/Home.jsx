import React from 'react'
import Navbar from './Navbar'
import { IoIosSend } from "react-icons/io";
import { NavLink } from 'react-router-dom';

const Home = () => {
  return (
    <main className='bg-[url(../src/assets/Homepagebg.webp)] bg-cover bg-center relative w-screen h-screen flex items-center justify-center flex-col'>
      <Navbar textColor="white" />
      <main className='w-screen h-screen flex items-center justify-center flex-col gap-4 md:w-[80%]'>
        <h1 className='text-white tracking-[2px] text-center text-5xl sm:text-6xl'>Welcome to Venue Buddy!</h1>
        <div className="book-btn flex flex-col items-center justify-center w-full gap-3">
          <NavLink to='/Deshboard' className='bg-[blueviolet] w-[200px] !py-[7px] rounded-lg text-white text-2xl flex items-center justify-center font-semibold cursor-grab active:cursor-grabbing sm:w-[300px]'>Book Event</NavLink>
          <NavLink
            to='/Contact'
            className='group border-4 border-[blueviolet] w-[200px] !py-[7px] rounded-lg 
             text-white text-2xl font-semibold flex items-center justify-center gap-2
             transition-all duration-300 hover:bg-[blueviolet] sm:w-[300px]'>
            Contact
            <IoIosSend className='transition-all duration-300 group-hover:rotate-45 group-hover:translate-x-4' />
          </NavLink>

        </div>
      </main>
    </main>
  )
}

export default Home