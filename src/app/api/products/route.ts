import { db } from "@/lib/db/db";
import { products } from "@/lib/db/schema";
import { ProductSchema } from "@/lib/validators/productSchema";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { Buffer } from 'buffer';
import dotenv from "dotenv"
dotenv.config()

export async function POST(req: Request) {
    const formData = await req.formData();
    
    const imageFile = formData.get("image");
    if (!imageFile) {
        return Response.json({ message: "No image provided" }, { status: 400 });
    }

    // Convert the image data directly to buffer
    const imageBuffer = Buffer.from(await (imageFile as any).arrayBuffer());

    let validData;
    try {
        validData = await ProductSchema.parse({
            name: formData.get("name"),
            description: formData.get("description"),
            price: formData.get("price"),
            image: imageFile
        });
    } catch (error) {
        return Response.json(error, { status: 400 });
    }

    // Use a default extension
    const fileName = `${Date.now()}.png`;

    try {
        const filePath = path.join(process.cwd(), "public/assets", fileName);
        await writeFile(filePath, imageBuffer);
    } catch (error) {
        return Response.json({ message: "Failed to store image in file system" }, { status: 500 });
    }

    // ... rest of the code remains the same ...
    try {
        const product = await db.insert(products).values({
            ...validData,
            image: fileName
        });

        return Response.json({ message: "OK" }, { status: 201 });
    } catch (error) {
        return Response.json({ message: "Failed to create product" }, { status: 500 });
    }
}

export async function GET(){
    try {
        console.log('env',process.env.DATABASE_URI);
        
        const allProducts = await db.select().from(products)
        return Response.json(allProducts);
    } catch (error) {
        console.log(error);
        return Response.json({message:"failed to fetch products",error},{ status: 500 });
    }
}