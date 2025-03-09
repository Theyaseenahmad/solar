'use client'
import React from 'react'
import { columns} from './_components/Column'
import { useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { GetInventories } from '@/lib/http/GetInventories'
import { InventoriesTable } from './_components/InventoryTable'

const InventoryPage = () => {
    const {data,error,isError,isLoading} = useQuery({
        queryKey:['inventories'],
        queryFn:GetInventories
    })


   

    if(isError) return (
      <>
      <h1 className='text-destructive'>Something went wrong</h1>
      </>
    )


  return (
    <div className=''>


      {isLoading? <Loader2 className='animate-spin text-center size-12 mx-auto'/> : <InventoriesTable data={data || []} columns={columns}></InventoriesTable>}
        
    </div>
  )
}

export default InventoryPage