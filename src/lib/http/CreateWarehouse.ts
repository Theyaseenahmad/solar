
import { Warehousedata } from "@/app/types/WarehouseData"
import axios from "axios"

const CreateWarehouse =async (data:Warehousedata)=>{
    try {
        
        const response = await axios.post('/api/warehouses',data)

        return response.data
    } catch (error : any) {
        return error.response.data.message
    }
   
}

export default CreateWarehouse