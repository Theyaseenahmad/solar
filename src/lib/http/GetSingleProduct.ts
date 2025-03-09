import axios from 'axios'
type prop = {
    productId : string
}

export const GetSingleProduct = async (productId: string)=>{
    try {
        const response = await axios.post(`/api/product`,{
            productId
        })
        return response.data.product;
    } catch (error : any) {
        return error.response.data.message
    }
    
}