import { db } from "@/lib/db/db";
import { warehouses } from "@/lib/db/schema";
import { WarehouseSchema } from "@/lib/validators/warehouseSchema";

export async function POST(req: Request) {
  const Data = await req.json();

  let validData;
  try {
    validData = await WarehouseSchema.parse(Data);
  } catch (error) {
    return Response.json(
      { message: "error validating warehouse - zod" },
      { status: 400 }
    );
  }

  try {
    const warehouse = await db.insert(warehouses).values(validData);
    return Response.json({message:"OK"},{status:201});
  } catch (error) {
    return Response.json({message:"error creating warehouse"},{ status: 500 });
  }
}

export async function GET(){
    try {
    const allWarehouses = await db.select().from(warehouses)
    return Response.json(allWarehouses)
    } catch (error) {
        return Response.json({message:"failed to fetch warehouses"},{ status: 500 });
        
    }
}
