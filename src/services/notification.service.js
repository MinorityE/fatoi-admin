import authHeader from "../helper/authHeader";
import { http } from "../helper/http.request";

class NotificationService{
    constructor(http){
        this.request=http
    }

    async createNotification(data){
        try {
           return await this.request.post(`/notifications`,
           data, 
           { headers : authHeader()} )
        } catch (error) {
            throw new Error(error)
            console.log(error)
        }

    }
}



export default new NotificationService(http);