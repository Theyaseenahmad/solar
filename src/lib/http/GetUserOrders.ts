import axios from 'axios'


export const GetUserOrders = async ()=>{
    try {
        const response = await axios.get('/api/yourOrders')
        return response.data;
    } catch (error : any) {
        return error.response.data.message
    }
    
}