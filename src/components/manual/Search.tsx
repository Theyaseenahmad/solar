'use client'

import {
    Calculator,
    Calendar,
    CreditCard,
    SearchIcon,
    Settings,
    Smile,
    User,
  } from "lucide-react"
  
  import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
  } from "@/components/ui/command"
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import SearchProd from "@/lib/http/SearchProd";
import { Input } from "../ui/input";
import Link from "next/link";
import { Products } from "@/app/admin/products/_components/Column";
  
  export function Search() {

    const [name, setname] = useState('');

    const [prods,setprods] = useState([]);

    const {mutate} = useMutation({
        mutationKey:['search'],
        mutationFn: async (name : {name:string})=> await SearchProd(name),
        onSuccess:(data)=>{
            setprods(data)
        }
      })

    const onSubmit = ()=>{
        setTimeout(() => {
            mutate({name})
          }, 2000);
        
      }
   
    

    const [open, setopen] = useState(false);
    return (

        <div>
            
            <SearchIcon className="" onClick={()=>setopen(true)}></SearchIcon>

        <CommandDialog  open={open} onOpenChange={setopen}>
      <Command className="rounded-lg border shadow-md md:min-w-[450px]">
        <Input value={name} className="rounded-none" placeholder="search..." onChange={(e:any)=>{
        setname(e.target.value);
        onSubmit();
      }}/>
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
          
            {prods && prods.map((item:Products)=>(
                <Link href={`/products/${item.id}`} key={item.id}>
                <CommandItem >
                <Calendar />
                <span>{item.name || ''}</span>
              </CommandItem>
              </Link>

            ))}
            
          
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <Link href={'/admin'}>
            <CommandItem>
              <User />
              <span>Admin</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            </Link>
           
           
          </CommandGroup>
        </CommandList>
      </Command>
      </CommandDialog>
      </div>
    )
  }
  