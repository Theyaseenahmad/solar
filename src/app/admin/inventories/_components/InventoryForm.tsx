
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SheetClose } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { DeliveryPersonData } from "@/app/types/DeliveryPersonData";
import CreateDeliveryPerson from "@/lib/http/CreateDeliveryPerson";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GetWarehouses } from "@/lib/http/GetWarehouses";
import { Warehouse } from "../../warehouses/_components/Column";
import { deliveryPersonReactFormSchema } from "@/lib/validators/deliveryPersonReactFormSchema";
import { GetProducts } from "@/lib/http/GetProducts";
import CreateInventory from "@/lib/http/CreateInventory";
import { invertorySchema } from "@/lib/validators/inventorySchema";
import { InventoryData } from "@/app/types/InventoryData";
import { invertoryReactFormSchema } from "@/lib/validators/inventoryReactFormSchema";
import { Inventories } from "./Column";
import { Products } from "../../products/_components/Column";


const InventoryForm = () => {

  const [warehouseData, setwarehouseData] = useState([])
  const [productData,setProductData] = useState([])

  useEffect(()=>{

    GetProducts().then((data)=>{
      setProductData(data)
    })
    
    GetWarehouses().then((data)=>{
      setwarehouseData(data)
    })


    
  }, [])

  


 
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const {mutate} = useMutation({
    mutationKey:['create-inventory'],
    mutationFn: (data : InventoryData)=>CreateInventory(data),
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:['inventory']})
      toast({
        title:'Inventory Created SuccessFully'
      })
    }
  })
  const onSubmit = (InventoryDet : z.infer<typeof invertoryReactFormSchema>) => {
    const DPdata = {SKU:InventoryDet.SKU, warehouseId: InventoryDet.warehouseID, productId: InventoryDet.productId}
    mutate(DPdata)
  }
  const form = useForm<z.infer<typeof invertoryReactFormSchema>>({
    resolver: zodResolver(invertoryReactFormSchema),
    defaultValues:{
    }
  });
  const {formState : {isValid,isValidating}} = form
  return (
    <div className="flex flex-col gap-6 p-2">
    <Form  {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="SKU"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SKU</FormLabel>
              <FormControl>
                <Input placeholder="Ex. CH123456" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="productId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product ID</FormLabel>
              <FormControl>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified ProductID" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {
                    productData.map((ele : Products,idx)=>{
                      return (<SelectItem key={idx} value={(ele.id).toString()}>Products {ele.id}</SelectItem>)
                    })
                  }
                </SelectContent>
              </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="warehouseID"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Warehouse ID</FormLabel>
              <FormControl>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified WarehouseID" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {
                    warehouseData.map((ele : Warehouse,idx)=>{
                      return (<SelectItem key={idx} value={(ele.id).toString()}>Warehouse {ele.id}</SelectItem>)
                    })
                  }
                </SelectContent>
              </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isValid? 
          (<SheetClose disabled={isValidating}  className="w-full" asChild>
        <Button type="submit" className="tracking-tighter w-full">Create</Button>
        </SheetClose> ) : (<Button type="submit" className="tracking-tighter w-full border-2 rounded-lg" variant={'ghost'}>Create</Button>)
        }
        </form>
     </Form>
    </div>
  );
};
export default InventoryForm;
