import axios from "axios"
import { number, string } from "zod";

const ChangeStatus = async({status,orderId}:{status:string,orderId:number})=>{
    try {
        const response = await axios.patch('/api/orders/status',{status,orderId})

        return Response.json({message:response.data},{status:200})
    } catch (error) {
        return Response.json({message:'error in http'},{status:500})
    }

  

}
export default ChangeStatus