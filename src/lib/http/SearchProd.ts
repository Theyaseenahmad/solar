import axios from "axios"

const SearchProd = async({name}:{name:string})=>{
    try {

        const response = await axios.post('/api/search/',{name})
        return response.data.prods;
    } catch (error) {
        return Response.json({message:'error in http'},{status:500})
    }

}
export default SearchProd