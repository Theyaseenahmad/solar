
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


const DeliverypersonForm = () => {

  const [warehouseData, setwarehouseData] = useState([])

  useEffect(()=>{
    
    GetWarehouses().then((data)=>{
      setwarehouseData(data)
    })
    
  }, [])

  


 
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const {mutate} = useMutation({
    mutationKey:['create-delivery-person'],
    mutationFn: (data : DeliveryPersonData)=>CreateDeliveryPerson(data),
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:['deliveryPerson']})
      toast({
        title:'Delivery Person Created SuccessFully'
      })
    }
  })
  const onSubmit = (DeliveryPersonDet : z.infer<typeof deliveryPersonReactFormSchema>) => {
    const DPdata = {name:DeliveryPersonDet.name,pincode:DeliveryPersonDet.pincode,phone:(DeliveryPersonDet.phone),warehouseId: DeliveryPersonDet.warehouseId}
    mutate(DPdata)
  }
  const form = useForm<z.infer<typeof deliveryPersonReactFormSchema>>({
    resolver: zodResolver(deliveryPersonReactFormSchema),
    defaultValues:{
        name:'',
        pincode:'',
    }
  });
  const {formState : {isValid,isValidating}} = form
  return (
    <div className="flex flex-col gap-6 p-2">
    <Form  {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Delivery Person Name</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Ex: 9192381098" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pincode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pincode</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="warehouseId"
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
export default DeliverypersonForm;
