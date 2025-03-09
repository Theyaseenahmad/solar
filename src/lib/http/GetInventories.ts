import axios from 'axios'

export const GetInventories = async ()=>{
    try {
        const response = await axios.get('/api/inventories')
        return response.data;
    } catch (error : any) {
       return error.response.data.message
    }
    
}