import { ProductSchema } from "@/lib/validators/productSchema";
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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CreateProduct from "@/lib/http/CreateProduct";
import { Products } from "./Column";
import useProductStore from "@/app/stores/Product-store";
import { SheetClose } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";

const ProductForm = () => {


  const queryClient = useQueryClient()
  const { toast } = useToast()

  const {mutate} = useMutation({
    mutationKey:['create-product'],
    mutationFn: (data : FormData)=>CreateProduct(data),
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:['products']})
      toast({
        title:'Product Created SuccessFully'
      })
    }
  })
  const onSubmit = (ProductDetails : z.infer<typeof ProductSchema>) => {

    const formData = new FormData() 
    formData.append('name',ProductDetails.name);
    formData.append('description',ProductDetails.description);
    formData.append('image',ProductDetails.image);
    formData.append('price',ProductDetails.price);

    mutate(formData)
  }


  

  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues:{
        name:'',
        description:'',
        price:''
    }
  });
  const {formState : {isValid,isValidating}} = form
  

  const {setValue} = form;


  const handlechange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    if(e.target.files && e.target.files[0]){
        setValue("image",e.target.files[0])
    }

  }

  return (
    <div className="flex flex-col gap-6 p-2">
    <Form  {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Cadbury Silk" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
<FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Indulge in the finest chocolate crafted with the utmost care and precision..." {...field} />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />


<FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Image Banner</FormLabel>
              <FormControl>
                <Input  type="file" onChange={handlechange} />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />

        
<FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
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

export default ProductForm;
