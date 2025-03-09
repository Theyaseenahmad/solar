import React from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";
import { cn } from "@/lib/utils";
import DashboardTable from "./DashboardTable";

const Dashboard = () => {
  return (
    <div className="p-4 h-full flex flex-col justify-start items-center gap-4">


    <div className="w-full flex items-center justify-between ">
     <div  className={cn(
           "z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
         )}>
        <div className="w-full h-full flex flex-col items-start justify-center">
            <h3 className="text-gray-600 text-sm font-bold">Total Sales</h3>
            <h2 className="text-lg font-extrabold">Rs. 45,231</h2>
            <p className="text-xs font-semibold text-slate-400">20% upspike from last month</p>
        </div>
     </div>

     <div  className={cn(
           "z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
         )}>
        <div className="w-full h-full flex flex-col items-start justify-center">
            <h3 className="text-gray-600 text-sm font-bold">Total Sales</h3>
            <h2 className="text-lg font-extrabold">Rs. 45,231</h2>
            <p className="text-xs font-semibold text-slate-400">20% upspike from last month</p>
        </div>
     </div>

     <div  className={cn(
           "z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
         )}>
        <div className="w-full h-full flex flex-col items-start justify-center">
            <h3 className="text-gray-600 text-sm font-bold">Total Sales</h3>
            <h2 className="text-lg font-extrabold">Rs. 45,231</h2>
            <p className="text-xs font-semibold text-slate-400">20% upspike from last month</p>
        </div>
     </div>


    

      
    </div>
    <DashboardTable></DashboardTable>



    </div>
  );
};

export default Dashboard;
