import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import ChangeStatus from '@/lib/http/ChangeStatus'
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'

const StatusChanger = ({status,orderId}:{status:string,orderId:number}) => {

    const {toast} = useToast()

    const queryClient = useQueryClient()

    const {mutate} = useMutation({
        mutationKey:['status'],
        mutationFn: (data:any)=>ChangeStatus(data),
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['orders']}),
            toast({
                title:"status changed successfully"
            })

            
        }
    })

  return (
    <Select defaultValue={status} onValueChange={(status)=>mutate({status,orderId})}>
    <SelectTrigger className="w-[90px]">
      <SelectValue placeholder={status} />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="paid">Paid</SelectItem>
      <SelectItem value="reserved">Reserved</SelectItem>
      <SelectItem value="completed">Completed</SelectItem>
    </SelectContent>
  </Select>
  
  )
}

export default StatusChanger