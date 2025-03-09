'use client'
import React from 'react'
import { columns} from './_components/Column'
import { useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import {  OrdersTable } from './_components/OrdersTable'
import { GetOrders } from '@/lib/http/GetOrders'

const OrdersPage = () => {
    const {data,error,isError,isLoading} = useQuery({
        queryKey:['orders'],
        queryFn:GetOrders
    })

   

    if(isError) return (
      <>
      <h1 className='text-destructive'>Something went wrong</h1>
      </>
    )


  return (
    <div className=''>


      {isLoading? <Loader2 className='animate-spin text-center size-12 mx-auto'/> : <OrdersTable data={data || []} columns={columns}></OrdersTable>}
        
    </div>
  )
}

export default OrdersPage