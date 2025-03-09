
import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Products = {
  id: number,
  name: string
  description: string
  image: File
  price: number
}

export const columns: ColumnDef<Products>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "description",
  },
  {
    accessorKey: "image",
    header: "Image",
  },
  {
    accessorKey: "price",
    header: "Price (₹) ",
  },
 
  
]
