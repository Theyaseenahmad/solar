import React from 'react'
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
  } from "@/components/ui/menubar"
import { CircleUser } from 'lucide-react'

const Menu = () => {
  return (
    <Menubar className="bg-transparent ">
  <MenubarMenu >
    <MenubarTrigger className="bg-transparent size-fit"><CircleUser className="bg-transparent" /></MenubarTrigger>
    <MenubarContent>
      <MenubarItem>
        My Profile <MenubarShortcut>⌘T</MenubarShortcut>
      </MenubarItem>
      <MenubarItem>Settings</MenubarItem>
      <MenubarSeparator />
      <MenubarItem>Support</MenubarItem>
      <MenubarSeparator />
      <MenubarItem>Logout</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>
  )
}

export default Menu