
import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Inventories = {
 SKU : string,
 wareHouse : number,
 product : number
}

export const columns: ColumnDef<Inventories>[] = [
  {
    accessorKey: "SKU",
    header: "SKU",
  },
  {
    accessorKey: "product",
    header: "Product",
  },
  {
    accessorKey: "wareHouse",
    header: "Warehouse",
  },
  
  
 
  
]
