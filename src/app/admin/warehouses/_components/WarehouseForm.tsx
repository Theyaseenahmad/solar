
import React from "react";
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
import { WarehouseSchema } from "@/lib/validators/warehouseSchema";
import CreateWarehouse from "@/lib/http/CreateWarehouse";
import { Warehousedata } from "@/app/types/WarehouseData";

const WarehouseForm = () => {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const {mutate} = useMutation({
    mutationKey:['create-warehouse'],
    mutationFn: (data : Warehousedata)=>CreateWarehouse(data),
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:['warehouse']})
      toast({
        title:'Warehouse Created SuccessFully'
      })
    }
  })
  const onSubmit = (WarehouseDet : z.infer<typeof WarehouseSchema>) => {
    const wData = {name:WarehouseDet.name,pincode:WarehouseDet.pincode}
    mutate(wData)
  }
  const form = useForm<z.infer<typeof WarehouseSchema>>({
    resolver: zodResolver(WarehouseSchema),
    defaultValues:{
        name:'',
        pincode:''
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
              <FormLabel>Warehouse Name</FormLabel>
              <FormControl>
                <Input placeholder="Warehouse 1" {...field} />
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
export default WarehouseForm;
