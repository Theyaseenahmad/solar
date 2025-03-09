import { db } from "@/lib/db/db";
import { products } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req:Request){
try {
    const {productId} = await req.json();
    
    const product = await db.select().from(products).where(eq(products.id,Number(productId)))
    return Response.json({product},{status:200});
} catch (error) {
    return Response.json({message:"failed to fetch singleProduct",error},{status:500})
    
    
}
}