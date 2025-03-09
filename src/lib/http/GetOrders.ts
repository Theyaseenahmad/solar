import axios from 'axios'

export const GetOrders = async ()=>{
    try {
        const response = await axios.get('/api/orders')
        return response.data;
    } catch (error : any) {
        return error.response.data.message
    }
    
}