import { z } from "zod";

export const WarehouseSchema = z.object({
    name:z.string({message:"name should be a string"}).max(100,{message:"name should be less than 100 characters"}).min(3,{message:"name should be more than 3 characters"}),
    
    pincode:z.string({message:"pincode should be a string"}).length(6,{message:"pincode should be 6 characters long"})

})