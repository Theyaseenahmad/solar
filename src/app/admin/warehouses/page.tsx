'use client'
import React from 'react'
import {  WarehouseTable } from './_components/WarehouseTable'
import { columns} from './_components/Column'
import { useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { GetWarehouses } from '@/lib/http/GetWarehouses'

const WarehousePage = () => {
    const {data,error,isError,isLoading} = useQuery({
        queryKey:['warehouse'],
        queryFn:GetWarehouses
    })

   

    if(isError) return (
      <>
      <h1 className='text-destructive'>Something went wrong</h1>
      </>
    )


  return (
    <div className=''>


      {isLoading? <Loader2 className='animate-spin text-center size-12 mx-auto'/> : <WarehouseTable data={data || []} columns={columns}></WarehouseTable>}
        
    </div>
  )
}

export default WarehousePage