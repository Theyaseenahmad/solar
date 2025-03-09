import { z } from "zod";

export const ProductSchema = z.object({
    name:z.string({message:"name should be a string"}).max(100,{message:"name should be less than 100 characters"}).min(3,{message:"name should be more than 3 characters"}),
    description:z.string({message:"description should be a string"}).max(100,{message:"description should be less than 100 characters"}).min(3,{message:"description should be more than 3 characters"}),
    price:z.string({message:"price should be a string"}), 
    image:z.instanceof(File,{message:"image should be a Image file"})
})