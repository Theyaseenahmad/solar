import axios from 'axios'

export const GetWarehouses = async ()=>{
    try {
        const response = await axios.get('/api/warehouses')
        return response.data;
    } catch (error:any) {
        return error.response.data.message
    }
    
}