import React from 'react'

const Footer = ({bgColor}) => {
  return (
    <footer style={{backgroundColor: bgColor}} className="w-full h-[10%] flex items-center justify-center">
      <h1 className='text-white text-xl text-center'>Venue Buddy © 2025</h1>
    </footer>
  )
}

export default Footer
