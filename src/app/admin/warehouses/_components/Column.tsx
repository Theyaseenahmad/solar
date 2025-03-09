
import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Warehouse = {
  name: string
  pincode: string
  id: number
}

export const columns: ColumnDef<Warehouse>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "pincode",
    header: "Pincode",
  },
  
 
  
]
