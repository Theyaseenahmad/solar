import { db } from "@/lib/db/db";
import { products } from "@/lib/db/schema";
import { ilike } from "drizzle-orm";

export async function POST(req: Request){
try {
    const {name} = await req.json();
    const prods = await db.select().from(products).where(
       ilike(products.name, `%${name}%`)
    )
    return Response.json({prods},{status:200});
} catch (error) {
    return Response.json("no results found",{status:404});
}
}