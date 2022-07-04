import authHeader from "../helper/authHeader";
import { http } from "../helper/http.request";

class VcService{
    constructor(http){
        this.request=http
    }
    async getVcs({limit,page}){
        try {
           return await this.request.get('/vcs', 
            { 
                headers : authHeader(),
                params:{
                    limit,
                    page
                }
            })
        } catch (error) {
            return error
            console.log(error)
        }

    }
 
    
}



export default new VcService(http);