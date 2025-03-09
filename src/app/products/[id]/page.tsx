'use client'
import Navbar from '@/app/_components/Navbar'
import { dataType } from '@/app/api/payment/route'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import CreateOrder from '@/lib/http/CreateOrder'
import { GetSingleProduct } from '@/lib/http/GetSingleProduct'
import { BuyForm } from '@/lib/validators/BuyForm'
import { ProductSchema } from '@/lib/validators/productSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface Singleprod {
  name: string,
  image : string,
  price : number,
  description: string
}
const ProductPage = () => {

  const {toast} = useToast()
    const pathname = usePathname()
    const productId = pathname.split('/')[2]
    
    const { data : prod, isSuccess} =  useQuery<Singleprod[]>({
      queryKey:[`product`,productId],
      queryFn: async ()=> await GetSingleProduct(productId)
  })

  const {mutate} = useMutation({
    mutationKey:['create-order'],
    mutationFn: async (values : dataType)=> await CreateOrder(values),
    onSuccess : (data:any)=>{
      
      if(data.url){
        toast({
          title:"redirecting to payment page"
        })
        window.location.href = data.url
      }else{
        toast({
          title:data
        })
      }
    },onError:(data:any)=>{
      toast({
        title:data
      })
    }
  })

  const form = useForm<z.infer<typeof BuyForm>>({
    resolver: zodResolver(BuyForm),
    defaultValues: {
      address:"",
      pincode:'',
      qty:1
    },
  })
  let qty = form.watch('qty');


  const price = useMemo(() => {
    
    if(isSuccess && prod && prod.length > 0){
      return qty * prod[0].price;
    }
    return 0
     
  }, [qty,prod,isSuccess])


//@ts-ignore
  const onSubmit = (data:buyForm)=>{
    const values = {
      price: price,
      address: data.address,
      pincode: data.pincode,
      qty: data.qty,
      product_id: productId
    }
    mutate(values);
  }

  const session =  useSession()

  if(isSuccess){
    return (
      <div className="flex items-center justify-center relative bg-gradient-to-br from-green-600 to via-green-500 to-white  h-screen w-full">
        <Navbar></Navbar>
         <div className='bg-green-400 rounded-xl h-[60%] w-[80%] flex overflow-hidden'>
  
          <div className='w-1/3 h-full'> <img className='w-full h-full object-cover' src={`/assets/${prod[0]?.image}`}  alt='' ></img></div>
  
  <div className='flex flex-col justify-center items-start p-4 gap-4'>
    <h2 className='text-sm font-bold tracking-tighter uppercase'>Brand name</h2>
    <h2 className='text-xl font-bold tracking-tighter uppercase'>{prod[0]?.name}</h2>
    <p className='text-sm font-semibold tracking-tighter'>{prod[0]?.description}</p>
          <div className='h-[40%] w-full  flex'>
          <Form {...form} >
        <form  onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className='flex gap-2'> <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-bold tracking-tighter'>Address</FormLabel>
                <FormControl>
                  <Textarea className='border-black' placeholder="Open Street" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="pincode"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-bold tracking-tighter'>Pincode</FormLabel>
                <FormControl>
                  <Input className='border-black' placeholder="Ex : 474001" {...field} />
                </FormControl>
               
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="qty"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-bold tracking-tighter'>Quantity</FormLabel>
                <FormControl>
                  <Input className='border-black' type='number' placeholder="" {...field} />
                </FormControl>
               
                <FormMessage />
              </FormItem>
            )}
          /></div>
         
          <Separator className='bg-black h-[2px] rounded-md'></Separator>
          <div className='flex w-full justify-between'><h2 className='font-extrabold tracking-tighter text-lg'>$ {price}</h2>
          {session.status=='authenticated'? <Button type='submit'>Buy now</Button>: <Link href={`/api/auth/signin?callbackUrl=${pathname}`}>
          <Button>Buy now</Button></Link>}
           
           
           
           </div>
         
        </form>
      </Form>
          </div>
          
          

          </div>
  
         </div>
      </div>
    )
  }

 
}

export default ProductPage