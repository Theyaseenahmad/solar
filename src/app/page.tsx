"use client"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import Navbar from './_components/Navbar'
import Image from 'next/image'
import Products from './_components/Products'
import { useSession } from 'next-auth/react'

const Page = () => {

  const {data: session} = useSession()
  console.log(session);
  


  return (
    
    
  <div className='min-h-screen bg-black w-screen relative flex flex-col items-center justify-center'>

    <div className='w-screen absolute top-0 h-screen bg-black'> <video className='w-full object-cover h-full brightness-75 -z-40' preload='metadata' autoPlay loop muted src="https://videos.pexels.com/video-files/15046856/15046856-sd_960_506_24fps.mp4"></video></div>

    <div className='bg-transparent w-screen min-h-screen flex flex-col items-center justify-center'>
      
      <h1 className='text-7xl  relative text-white font-extrabold bigTxt z-50 text-center'>GET SOLAR ELECTRICALS INSTALLED TODAY</h1>

    <h2>welcome to LEHK</h2>
    
    <h3 className='z-50 w-[60%] mx-auto text-white font-bold text-sm text-center uppercase'>LEHK PVT LTD is a startup that provides solar electricals for homes and offices
    We have installed over 100 solar panels in different locations around madhya pradesh. 
    </h3>

    </div>


    <div id='products' className="min-h-screen px-10 py-10 w-full bg-[url('https://images.pexels.com/photos/9875680/pexels-photo-9875680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] relative">
    <div className='w-full h-full bg-white/5 backdrop-blur-md  p-6 absolute top-0 left-0'></div>
      <h1 className='text-4xl relative text-white font-bold bigTxt2 z-50'>OUR PRODUCTS</h1>
      <Products></Products>
    </div>
    
    
 
  </div>
    
  )
}

export default Page