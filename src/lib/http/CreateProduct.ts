import { Products } from "@/app/admin/products/_components/Column"
import axios from "axios"

const CreateProduct =async (data:FormData)=>{
    const response = await axios.post('/api/products',data,{
        headers: {
            'Content-Type' : 'multipart/form-data'
        }
    })

    return response.data
}

export default CreateProduct