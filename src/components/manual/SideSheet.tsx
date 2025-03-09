import React from 'react'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import ProductForm from '@/app/admin/products/_components/ProductForm'
import WarehouseForm from '@/app/admin/warehouses/_components/WarehouseForm'
import DeliverypersonForm from '@/app/admin/delivery-persons/_components/DeliveryPersonForm'
import InventoryForm from '@/app/admin/inventories/_components/InventoryForm'

const SideSheet = ({lastpath}:{lastpath:String}) => {


  return (
    <Sheet>
    <SheetTrigger asChild>
      {lastpath == 'orders' ? '' :  <Button variant="default" className='tracking-tighter'>Create {lastpath}</Button>}
     
    </SheetTrigger>

    <SheetContent>
      {lastpath == "warehouses" && <WarehouseForm></WarehouseForm>}
      {lastpath == "products" && <ProductForm></ProductForm>}
      {lastpath == "delivery-persons" && <DeliverypersonForm></DeliverypersonForm>}
      {lastpath == "inventories" && <InventoryForm></InventoryForm>}
    </SheetContent>

    
  </Sheet>
  )
}

export default SideSheet