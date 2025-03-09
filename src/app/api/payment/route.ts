 import { authOptions } from '@/lib/auth/options';
import { getServerSession } from 'next-auth';
import Stripe from 'stripe';

export type dataType = {
    price:number,
    pincode:string,
    address:string,
    qty:number,
    product_id?:string

}


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req:Request){
    try {

        const session = await getServerSession(authOptions)

        if(!session){
            return Response.json({message:'unauthorized'},{status:403})
        }
        
        //@ts-ignore
        const name =session.token?.name;
        //@ts-ignore
        const email = session.token?.email

        const Data = await req.json()

        const customer = await stripe.customers.create({
            name,
            email,
            address: {
                city:Data.address,
                postal_code:Data.pincode
            }
        })

        const checkoutSession = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            success_url:'/payment/success/'+customer.id,
            cancel_url:'/payment/cancelled/'+customer.id,
            mode:'payment',
            customer:customer.id,
            line_items:[
                {
                    quantity: Number(Data.qty),
                    price_data:{
                        product_data:{
                            name:'solar'
                        },
                        currency:"USD",
                        unit_amount:Number(Data.price)*100
                    }
                }
                
            ],
            metadata: {
                order_id: Data.orderId,  
              },
        })
        return Response.json({checkout:checkoutSession,url:checkoutSession.url},{status:200})
        
    } catch (error) {
        return Response.json({message:"error payment bitch",error},{status:500})
    }
}