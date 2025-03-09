import { z } from "zod";

export const OrderSchema = z.object({
    product_id:z.number({message:"productId should be a number"}),
    qty:z.number({message:"quantity should be a number"}),
    address:z.string({message:"address should be a string"}).max(100,{message:"address should be less than 100 characters"}).min(3,{message:"address should be more than 3 characters"}),
    pincode:z.string({message:"pincode should be a string"}).length(6,{message:"pincode should be 6 characters long"}),
    price:z.number({message:"quantity should be a number"})
})