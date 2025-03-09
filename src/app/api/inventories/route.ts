import { db } from "@/lib/db/db";
import { inventories, products, warehouses } from "@/lib/db/schema";
import { invertorySchema } from "@/lib/validators/inventorySchema";
import { eq } from "drizzle-orm";

export async function POST(req:Request){
let validData;
const Data = await req.json()
try {
    validData = await invertorySchema.parse(Data)
    if(validData){
        const inventory = await db.insert(inventories).values(validData)
        return Response.json({message:"OK"},{status:201})
    }
    else{
        return Response.json({message:"error in schema validation"},{status:400})
    }
} catch (error) {
    return Response.json({message:"error creating inventory"})
}
}

export async function GET(){
    try {
        const allInventories = await db.select(
            {
                SKU:inventories.SKU,
                wareHouse : warehouses.name,
                product : products.name
            }
        ).from(inventories).leftJoin(warehouses,eq(warehouses.id,inventories.warehouseID)).leftJoin(products,eq(products.id,inventories.productId))
        return Response.json(allInventories)
        
    } catch (error) {
        return Response.json({message:"error fetching inventories"},{status:500})
        
    }

}