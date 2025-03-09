import { varchar } from "drizzle-orm/mysql-core";
import { z } from "zod";

export const deliveryPersonSchema = z.object({
    name:z.string({message:"name should be a string"}).max(100,{message:"name should be between 3 and 100 characters"}),
    phone:z.string({message:"phone should be a string"}).length(10,{message:"phone should be 10 characters long"}),
    
    warehouseId:z.number({message:"warehouseId should be a number"}),
    pincode:z.string({message:"pincode should be a string"}).length(6,{message:"pincode should be 6 characters long"})
    
})