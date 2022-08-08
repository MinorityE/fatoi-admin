import authHeader from "../helper/authHeader";
import { http } from "../helper/http.request";

class FounderService{
    constructor(http){
        this.request=http
    }
    async getNotApproved({limit,page}){
        try {
           return await this.request.get('/founders/not-approved', 
            { 
                headers : authHeader(),
                params:{
                    limit,
                    page
                }
            })
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }

    }
  
    async updateBulkStatus(ids, status) {
        try {
            return await this.request.post(`/founders/update-bulk-status`,
                {
                    ids: ids,
                    status: status
                },
                {
                    headers: authHeader(),
                })
        } catch (error) {
            console.log(error)
            throw new Error(error)

        }

    }

    async addFounder(data){

        try {
            return  await this.request.post( "/founders",
              data,
              { headers: authHeader() }
            )
           
        } catch (error) {
            console.log(error)
            throw new Error(error)

        }
    }
}



export default new FounderService(http);