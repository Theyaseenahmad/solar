import { z } from "zod";

export const BuyForm = z.object({
    address : z.string().max(100,{message:"address must be within 100 characters"}),
    pincode : z.string().length(6,{message:"pincode should be 6 characters long"}),
    qty: z.number()
})