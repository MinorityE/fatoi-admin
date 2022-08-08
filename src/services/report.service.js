import authHeader from "../helper/authHeader";
import { http } from "../helper/http.request";

class ReportService{
    constructor(http){
        this.request=http
    }
    async getReports({limit,page}){
        try {
           return await this.request.get('/reports', 
            { 
                headers : authHeader(),
                params:{
                    limit,
                    page
                }
            })
        } catch (error) {
            throw new Error(error)
            console.log(error)
        }
    }

    async takeActionBulkUser(ids,action){
        try {
           return await this.request.post(`/reports/action-taken/bulk`,
           {
            ids:ids,
            action:action
            } , 
           {  
                headers : authHeader(),
             })
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }

    }
  
}



export default new ReportService(http);