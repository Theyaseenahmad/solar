'use client'
import { Badge } from '@/components/ui/badge'
import { GetUserOrders } from '@/lib/http/GetUserOrders'
import { useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import React, { useState } from 'react'

type Order = {
    orders: {
      id: number;
      user_id: number;
      product_id: number;
      status: string;
      type: string;
      price: number;
      address: string;
      qty: number;
      createdAt: string; // Using string because date comes as ISO string
      updatedAt: string;
    };
    products: {
      id: number;
      name: string;
      description: string;
      price: string;
      image: string;
      createdAt: string;
      updatedAt: string;
    };
  };
  

const YourOrders = () => {

    const [ordersList, setOrdersList] = useState<Order[]>([]);


    const orders = useQuery({
        queryKey:['yourOrders'],
        queryFn:GetUserOrders,
        onSuccess:(data)=>{
            console.log(data)
            setOrdersList(data)
        }

    })

    console.log('orders',orders);

    if(ordersList.length === 0 || ordersList === undefined || orders.isLoading){
        return <div className='h-screen w-full flex items-center justify-center'><Loader2 className='size-12 animate-spin'/></div> 
    }

  return (
    <div className='w-full min-h-screen  flex flex-col items-center justify-start gap-4 p-4'>
        {ordersList.map((order,idx)=>{
            return (  <div key={idx} className='h-64 w-[60%] border-b-2 border-slate-500 p-2  flex'>

                <div className='h-full w-[35%] bg-teal-600 rounded-xl overflow-hidden'>
                    <img className='object-cover h-full w-full' src={`/assets/${order.products.image}`} alt="lol" />
                </div>
    
                <div className=' flex flex-col justify-between h-full w-[65%] p-4 gap-3 rounded-r-xl'>
    
                    <div className='flex justify-between'>
                        <h2 className='rounded-lg p-1 font-bold tracking-tighter font-mono'>{order.products.name}</h2>
                        <h2 className='rounded-lg p-1 font-bold tracking-tighter text-xl'>${order.products.price}</h2>
                    </div>
                    <div>
                        <h2 className='text-xl font-bold tracking-tighter font-serif'>{order.products.description}</h2>
                    </div>
                  
                    <div className='flex gap-2'>
    
                        <div className='flex gap-2'>
                            <Badge className='bg-green-800'>Placed</Badge>
                            <Badge className='bg-purple-600' >Arriving Sunday</Badge>
                        </div>
                    </div>
                </div>
            </div>
            )
        })}
      
    </div>
  )
}

export default YourOrders