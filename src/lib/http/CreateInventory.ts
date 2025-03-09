
import { DeliveryPersonData } from "@/app/types/DeliveryPersonData"
import { InventoryData } from "@/app/types/InventoryData"
import axios from "axios"

const CreateInventory =async (data:InventoryData)=>{
    try {

        const actualData = {
            SKU:data.SKU,
            productId:parseInt(data.productId),
            warehouseID:parseInt(data.warehouseId)
        }
        
        const response = await axios.post('/api/inventories',actualData)

        return response.data
    } catch (error) {
        throw new Error('fucked')
    }
   
}

export default CreateInventory