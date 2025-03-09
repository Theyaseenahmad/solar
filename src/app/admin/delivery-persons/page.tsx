'use client'
import React from 'react'
import {  DeliveryPersonTable } from './_components/DeliveryPersonTable'
import { columns} from './_components/Column'
import { useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { GetDeliverypersons } from '@/lib/http/GetDeliveryPersons'

const DeliveryPersonPage = () => {
    const {data,error,isError,isLoading} = useQuery({
        queryKey:['delivery-person'],
        queryFn:GetDeliverypersons
    })

   

    if(isError) return (
      <>
      <h1 className='text-destructive'>Something went wrong</h1>
      </>
    )


  return (
    <div className=''>


      {isLoading? <Loader2 className='animate-spin text-center size-12 mx-auto'/> : <DeliveryPersonTable data={data || []} columns={columns}></DeliveryPersonTable>}
        
    </div>
  )
}

export default DeliveryPersonPage