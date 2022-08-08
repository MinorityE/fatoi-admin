import authHeader from "../helper/authHeader";
import { http } from "../helper/http.request";

class AccessRequestService{
    constructor(http){
        this.request=http
    }
    async getAccessRequest({limit,page,status}){
        try {
           return await this.request.get('/access-request', 
            { 
                headers : authHeader(),
                params:{
                    limit,
                    page,
                    status
                }
            })
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }

    }
    async updateBulkStatus(ids,status){
        try {
            return await this.request.patch('/access-request/bulk', 
            { ids, status },
             { headers : authHeader()}
             )
         } catch (error) {
             console.log(error)
             throw new Error(error)
         }
    }
    
}



export default new AccessRequestService(http);