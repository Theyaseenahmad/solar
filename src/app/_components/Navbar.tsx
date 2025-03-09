"use client"
import { Search } from '@/components/manual/Search'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {

  const {data : session} = useSession()
  return (
    <div className='w-full h-20 flex absolute top-0 items-center justify-around text-white font-bold text-sm  z-10'>
      <Link href={'/'} className='text-4xl tracking-tighter font-extrabold'>LEHK</Link>

      <div className='flex gap-4 uppercase tracking-tighter'>
        <a href="/about">About</a>
        <a href="/Products">Products</a>

        {session && <a href="/yourOrders">Your Orders</a>}
        
      </div>

      <Search></Search>
    </div>
  )
}

export default Navbar