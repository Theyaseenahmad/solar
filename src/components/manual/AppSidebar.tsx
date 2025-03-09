import { Blocks, Calendar, Home, Inbox, Layers, Package2, Search, Settings, ShoppingCart, ShoppingCartIcon, Users, Warehouse } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"

const items = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: Home,
  },
  {
    title: "Products",
    url: "/admin/products",
    icon: Layers,
  },
  {
    title: "warehouses",
    url: "/admin/warehouses",
    icon: Warehouse,
  },
  {
    title: "Delivery persons",
    url: "/admin/delivery-persons",
    icon: Users,
  },
  {
    title: "Orders",
    url: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    title: "Inventories",
    url: "/admin/inventories",
    icon: Blocks,
  },

]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel  className="font-semibold text-black text-base flex justify-center items-center gap-1 h-12 "><Link href={'/'}>LEHK</Link><Package2 className="font-bold text-lg" /></SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
