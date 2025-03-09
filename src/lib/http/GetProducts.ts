import axios from 'axios'

export const GetProducts = async ()=>{
    try {
        const response = await axios.get('/api/products')
        return response.data;
    } catch (error : any) {
        return {error:error.response.data.message,status:500};
    }
    
}