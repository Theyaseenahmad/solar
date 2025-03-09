import { z } from "zod";

export const invertoryReactFormSchema = z.object({
    SKU: z.string({message:"SKU should be a string"}).length(8,{message:"SKU should be 8 chars long"}),
    warehouseID:z.string({message:"Choose valid Warehouse ID"}),
    productId: z.string({message:"Choose valid product ID"})

})