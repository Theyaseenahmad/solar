import { AppSidebar } from '@/components/manual/AppSidebar'
import Menu from '@/components/manual/Menu'
import Navbar from '@/components/manual/Navbar'
import SheetRow from '@/components/manual/SheetRow'
import { Badge } from '@/components/ui/badge'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'

export default function Layout({children}:{children:React.ReactNode}){
return(
  
  <SidebarProvider>
    <AppSidebar />
    <main className='w-full p-2'>
      <Navbar>
      <SidebarTrigger />
      <div className='flex items-center justify-start gap-2'>
      <Badge variant={"outline"}>You are an Admin</Badge>
      
      <Menu></Menu>
      </div>
      
      </Navbar>

      <SheetRow></SheetRow>
    
    {children}
    </main>
  </SidebarProvider>
  
)
}