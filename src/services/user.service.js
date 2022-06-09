import authHeader from "../helper/authHeader";
import { http } from "../helper/http.request";

class UserService{
    constructor(http){
        this.request=http
    }
    async getUsers({limit,page}){
        try {
           return await this.request.get('/users', 
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
    async getUser(id){
        try {
           return await this.request.get(`/users/${id}`, 
            {  headers : authHeader() })
        } catch (error) {
            return error
            console.log(error)
        }

    }
    async deleteBulkUsers(ids){
        try {
           return await this.request.delete(`/users/bulk`,
            {  
                headers : authHeader(),
                data:{
                    ids:ids
                }
             })
        } catch (error) {
            return error
            console.log(error)
        }

    }
    async suspendBulkUsers(ids,time){
        try {
           return await this.request.post(`/users/suspend/bulk`,
           {
            ids:ids,
            time:time
        } , 
           {  
                headers : authHeader(),
             })
        } catch (error) {
            return error
            console.log(error)
        }

    }
}



export default new UserService(http);