import { db } from "@/lib/db/db";
import { orders } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function PATCH(req:Request) {
    const {orderId,status} = await req.json();
    try {
        await db.update(orders).set({status:status}).where(eq(orders.id,orderId))
    } catch (error) {
        return Response.json({message:'failed status change'},{status:500})
    }

    return Response.json({message:status},{status:200})
}