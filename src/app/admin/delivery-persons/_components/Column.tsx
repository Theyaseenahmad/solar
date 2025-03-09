
import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type DeliveryPersons = {
  name: string,
  phone:number,
  pincode: string
  warehouseName: string
}

export const columns: ColumnDef<DeliveryPersons>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "pincode",
    header: "Pincode",
  },
  {
    accessorKey: "warehouseName",
    header: "Warehouse Name",
  },
  
 
  
]
