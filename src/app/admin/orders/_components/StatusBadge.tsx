import { Badge } from '@/components/ui/badge';
import React from 'react'

const StatusBadge = ({status}:{status:string}) => {

    const StatusColor = ()=>{ switch (status){
        case "paid":
            return "bg-green-600";

        case "reserved":
            return "bg-orange-400";   

        case "received":
            return "bg-yellow-400";

        case "completed":
            return "bg-black"
    }
    }

   
  return (
    <Badge className={`text-white p-1 text-xs capitalize flex items-center justify-center ${StatusColor()}`} >{status}</Badge>
  )
}

export default StatusBadge