import { db } from "@/lib/db/db";
import { deliveryPersons, warehouses } from "@/lib/db/schema";
import { deliveryPersonSchema } from "@/lib/validators/deliveryPersonSchema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  let validData;
  try {
    const Data = await req.json();
    validData = await deliveryPersonSchema.parse(Data);
    const warehouseId = Number(validData.warehouseId);

    if (validData) {
      const deliveryPerson = await db.insert(deliveryPersons).values({
        name: validData.name,
        pincode: validData.pincode,
        warehouseId: warehouseId,
        phone: validData.phone,
      });
    }

    return Response.json({ message: "OK" }, { status: 201 });
  } catch (error) {
    return Response.json(
      { message: "error creating delivery person" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const allDeliveryPersons = await db.select({
        name:deliveryPersons.name,
        pincode:deliveryPersons.pincode,
        phone:deliveryPersons.phone,
        warehouseName:warehouses.name
    }).from(deliveryPersons).leftJoin(warehouses,eq(warehouses.id,deliveryPersons.warehouseId));
    return Response.json(allDeliveryPersons);
  } catch (error) {
    return Response.json(
      { message: "error fetching deliverypersons" },
      { status: 500 }
    );
  }
}
