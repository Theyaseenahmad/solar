'use client'
import React from 'react'
import SideSheet from './SideSheet'
import { usePathname } from 'next/navigation'

const SheetRow = () => {
    const pathname = usePathname()
    const lastpath = pathname.split('/').splice(-1)[0].toString();

    const isAdminPage = lastpath === "admin" 

  return (
    <>
    {!isAdminPage && 
        <div className='w-full p-2 h-14 rounded-lg bg-slate-200 flex items-center justify-between my-2'>
        <h1 className='font-bold text-sm text-black tracking-tight'>{lastpath}</h1>
        <SideSheet lastpath={lastpath}></SideSheet>
    </div>
}
    </>
  )
}

export default SheetRow