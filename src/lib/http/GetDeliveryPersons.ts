import axios from 'axios'

export const GetDeliverypersons = async ()=>{
    try {
        const response = await axios.get('/api/deliveryPersons')
        return response.data;
    } catch (error:any) {
        return error.response.data.message
    }
    
}