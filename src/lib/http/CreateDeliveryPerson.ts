
import { DeliveryPersonData } from "@/app/types/DeliveryPersonData"
import axios from "axios"

const CreateDeliveryPerson =async (data:DeliveryPersonData)=>{
    try {

        const actualData = {
            name:data.name,
            phone:data.phone,
            pincode:data.pincode,
            warehouseId: parseInt(data.warehouseId) 
        }
        
        const response = await axios.post('/api/deliveryPersons',actualData)

        return response.data
    } catch (error) {
        throw new Error('fucked')
    }
   
}

export default CreateDeliveryPerson