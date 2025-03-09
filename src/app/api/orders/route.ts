import { authOptions } from "@/lib/auth/options";
import { db } from "@/lib/db/db";
import { deliveryPersons, inventories, orders, products, users, warehouses } from "@/lib/db/schema";
import { OrderSchema } from "@/lib/validators/OrderSchema";
import { and, eq, inArray, isNotNull, isNull } from "drizzle-orm";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
    let validData;
    const Data = await req.json();
    const session = await getServerSession(authOptions);
    let finalOrder: any = null;
  
    // Check if session exists
    if (!session) {
      return new Response(JSON.stringify({ message: "not authorized" }), { status: 403 });
    }
  
    // Validate the incoming data
    try {
      validData = await OrderSchema.parse(Data);
    } catch (error) {
      return new Response(JSON.stringify({ message: "error initiating order", error }), { status: 400 });
    }
  
  
    // Find warehouse by pincode
    const warehouseId = await db.select({ id: warehouses.id }).from(warehouses).where(eq(warehouses.pincode, Data.pincode)).limit(1);
  
  
    if (!warehouseId[0]) {
      return new Response(JSON.stringify({ message: "no warehouses available near the given pincode" }), { status: 400 });
    }
  
    // Find the product
    const product = await db.select().from(products).where(eq(products.id, validData.product_id));
  
    if (!product) {
      return new Response(JSON.stringify({ message: "product not found" }), { status: 400 });
    }
  
    // Check available stock before starting the transaction
    const AvailableStock = await db.select().from(inventories).where(and(
      isNull(inventories.orderId),
      eq(inventories.warehouseID, Number(warehouseId[0]?.id)),
      eq(inventories.productId, Number(validData.product_id))
    )).limit(validData.qty);
  
    // If stock is insufficient, respond with an error without proceeding to payment
    if (AvailableStock.length < validData.qty) {
      return new Response(JSON.stringify({ message: `stock low, only ${AvailableStock.length} products left` }), { status: 400 });
    }
  
    // Check if a delivery person is available before proceeding
    const DeliveryPerson = await db.select().from(deliveryPersons).where(
      and(
        isNull(deliveryPersons.orderId),
        eq(deliveryPersons.warehouseId, warehouseId[0].id)
      )
    ).limit(1);
  
    // If no delivery person is available, respond with an error
    if (!DeliveryPerson) {
      return new Response(JSON.stringify({ message: "no delivery options available at the moment" }), { status: 400 });
    }
  
    try {
      // Start transaction to insert the order and update inventories and delivery persons
      finalOrder = await db.transaction(async (transact) => {
        // Insert the order into the orders table
        const Order = await transact.insert(orders).values({
          ...validData,
          //@ts-ignore
          user_id: Number(session?.token.id),
          price: Number(product[0].price) * validData.qty,
        }).returning({ id: orders.id, price: orders.price });
  
        // Update inventories with the order ID
        await transact.update(inventories).set({ orderId: Order[0].id }).where(
          inArray(inventories.id, AvailableStock.map((stock) => stock.id))
        );
  
        // Update the delivery person with the order ID
        await transact.update(deliveryPersons).set({ orderId: Order[0].id }).where(
          eq(deliveryPersons.id, DeliveryPerson[0].id)
        );
  
        // Update the order status to 'reserved'
        await transact.update(orders).set({ status: "reserved" }).where(
          eq(orders.id, Order[0].id)
        );
  
        // Return the final order object
        return Order[0];
      });
  
      // Return the final order with success
      return new Response(JSON.stringify({ order: finalOrder, message: "Order placed successfully" }), { status: 201 });
  
    } catch (error  : any) {
      return new Response(JSON.stringify({ message: error.message || "Error Transacting currently, please try again or after some time" }), { status: 500 });
    }
  }
  



export async function GET(){
    try {
        const allOrders = await db.select(
            {
                id:orders.id,
                productName: products.name,
                userId:users.id,
                userName:users.Fname,
                status:orders.status,
                price:orders.price,
                qty:orders.qty,
                type:orders.type,
                address:orders.address
            }
        ).from(orders).leftJoin(users,eq(users.id,orders.user_id)).leftJoin(products,eq(products.id,orders.product_id))
        return Response.json(allOrders)
        
    } catch (error) {
        return Response.json({message:"error fetching inventories"},{status:500})
        
    }

}