'use client'
import React from 'react'
import { ProductTable } from './_components/ProductTable'
import { columns, Products } from './_components/Column'
import { useQuery } from '@tanstack/react-query'
import { GetProducts } from '@/lib/http/GetProducts'
import { Loader2 } from 'lucide-react'

const ProductsPage = () => {
    const {data,error,isError,isLoading} = useQuery({
        queryKey:['products'],
        queryFn:GetProducts
    })

   

    if(isError) return (
      <>
      <h1 className='text-destructive'>Something went wrong</h1>
      </>
    )


  return (
    <div className=''>


      {isLoading? <Loader2 className='animate-spin text-center size-12 mx-auto'/> : <ProductTable data={data || []} columns={columns}></ProductTable>}
        
    </div>
  )
}

export default ProductsPage