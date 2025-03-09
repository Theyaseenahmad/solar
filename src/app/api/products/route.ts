import { db } from "@/lib/db/db";
import { products } from "@/lib/db/schema";
import { ProductSchema } from "@/lib/validators/productSchema";
import { writeFile } from "node:fs/promises";
import path from "node:path";

export async function POST(req: Request) {
    const formData = await req.formData();
    
    // Convert the image to Blob explicitly since File might not be available in Node.js environment
   // ... existing code ...
   const imageFile = formData.get("image") as File;
   const imageBlob = new Blob([imageFile], { type: imageFile.type });
// ... existing code ...
    let validData;
    try {
        validData = await ProductSchema.parse({
            name: formData.get("name"),
            description: formData.get("description"),
            price: formData.get("price"),
            image: imageBlob
        });
    } catch (error) {
        return Response.json(error, { status: 400 });
    }

    // 🔹 Extract the extension safely
    const extension = validData.image.type.split("/")[1] || "png"; // Default to png if missing
    const fileName = `${Date.now()}.${extension}`;

    try {
        // 🔹 Convert Blob to Buffer
        const arrayBuffer = await validData.image.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // 🔹 Ensure `public/assets/` directory exists
        const filePath = path.join(process.cwd(), "public/assets", fileName);
        await writeFile(filePath, buffer);

    } catch (error) {
        return Response.json({ message: "Failed to store image in file system" }, { status: 500 });
    }

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