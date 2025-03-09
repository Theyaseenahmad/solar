import { dataType } from "@/app/api/payment/route"
import axios from "axios";

const CreateOrder = async (values:dataType)=>{
    try {

        const val = {
            price:Number(values.price),
            product_id:parseInt(values.product_id as string),
            qty:Number(values.qty),
            address:values.address,
            pincode:String(values.pincode)
        }


        const order = await axios.post('/api/orders',val)


        if(!order){
            throw new Error("error in order api")
        }

        const data = {
            orderId: order?.data.order.id,
            price:Number(values.price),
            product_id:parseInt(values.product_id as string),
            qty:Number(values.qty),
            address:values.address,
            pincode:String(values.pincode)
        }

        const response = await axios.post('/api/payment',data)
        if(response){
            return response.data;
        }
        else{

            throw new Error("no response got from api/payment",response)
            
        }
    } catch (error : any) {
        return error.response.data.message;
    }
    

}

export default CreateOrder;