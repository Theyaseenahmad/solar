import { authOptions } from "@/lib/auth/options";
import { db } from "@/lib/db/db";
import { orders, products } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";

export async function GET(){

    const session = await getServerSession(authOptions)
    //@ts-ignore
    if(!session || !session.token?.id){return Response.json({message:"unauthorized"},{status:403})}
try {
    //@ts-ignore
    const yourOrders = await db.select().from(orders).where(eq(orders.user_id,session.token.id)).leftJoin(products,eq(products.id,orders.product_id))
    console.log(yourOrders);
    
    return Response.json(yourOrders,{status:200});
} catch (error) {
    return Response.json({message:"failed to fetch products",error},{ status: 500 });
    
    
}
}