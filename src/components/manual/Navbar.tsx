import React from 'react'

const Navbar = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='flex items-center justify-between p-2 h-12 rounded-lg bg-[#D9D9D9] w-full'>
        {children}
    </div>
  )
}

export default Navbar