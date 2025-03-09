
import { Badge } from "@/components/ui/badge"
import { ColumnDef } from "@tanstack/react-table"
import StatusBadge from "./StatusBadge"
import StatusChanger from "./StatusChanger"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

// id:orders.id,
//                 productName: products.name,
//                 userId:users.id,
//                 userName:users.Fname,
//                 status:orders.status,
//                 price:orders.price,
//                 qty:orders.qty,
//                 type:orders.type,
//                 address:orders.address
export type Orders = {
  id:number,
  productName:string,
  userId:number,
  userName:string,
  status:string,
  price:number,
  qty:number,
  type:string,
  address:string
}

export const columns: ColumnDef<Orders>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "productName",
    header: "Product Name",
  },
  {
    accessorKey: "userId",
    header: "Customer ID",
  },

  {
    accessorKey: "userName",
    header: "Customer Name",
  },
 
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "qty",
    header: "Quantity",
  },
  {
    accessorKey: "type",
    header: "Order Type",
  },

  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell:({row})=>{
      return <StatusBadge status={row.original.status}/>
    }
  },
  {
    id:'StatusSelect',
    header:"Action",
    cell:({row})=>{
      return <StatusChanger status={row.original.status} orderId={row.original.id}></StatusChanger>
    }
  }
]
