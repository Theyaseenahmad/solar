
import { db } from "@/lib/db/db";
import { orders } from "@/lib/db/schema";
import axios from "axios";
import { eq } from "drizzle-orm";
import Stripe from "stripe";

export async function POST(req:Request){
    

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

        const sig = req.headers.get('stripe-signature');
        const payload = await req.text();

        let event;

        
        try {

            event = stripe.webhooks.constructEvent(payload,sig!,process.env.STRIPE_WEBHOOK_SECRET as string)


            switch(event.type){
                case 'checkout.session.completed':{
                    const session = await stripe.checkout.sessions.retrieve(
                        event.data.object.id,
                    )
                    const orderId = session.metadata?.order_id;

                    try {
                        await db.update(orders).set({status:"paid"}).where(eq(orders.id,parseInt(orderId!)))
                    } catch (error) {
                        return Response.json({error:error},{status:400})
                    }
                    
                    break;
                }
                case "checkout.session.expired":{
                    const session = await stripe.checkout.sessions.retrieve(
                        event.data.object.id,
                    )

                    const orderId = session.metadata?.order_id;
                    try {

                        const cancelledOrder = await db.delete(orders).where(eq(orders.id,parseInt(orderId!))).returning();

                        
                        
                    } catch (error) {
                        return Response.json({error:error},{status:500})
                    }
                }


                default:{
                    break;
                }
            }
    

            return Response.json({message:'payment Registered Successfully - order Placed'},{status:200})
    } catch (error) {
        return Response.json({error:error},{status:500})
    }
} 