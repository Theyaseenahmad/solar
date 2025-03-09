import { z } from "zod";

export const invertorySchema = z.object({
    SKU: z.string({message:"SKU should be a string"}).length(8,{message:"SKU should be 8 chars long"}),
    warehouseID:z.number({message:"warehouse Id should be a number"}),
    productId: z.number({message:"product id should be a number"})

})