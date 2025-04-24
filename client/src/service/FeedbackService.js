import { $authHost, $host } from "../http";

const FeedbackService =  {
    async sendFeedback(typeOfFeedback, userEmail, userFIO, feedbackMessage){
        return new Promise((resolve) => resolve($authHost.post('api/feedback/sendFeedback', {typeOfFeedback, userEmail, userFIO, feedbackMessage})))
    },

    // async getFeedbackOfType(typeOfFeedback){
    //     return new Promise((resolve) => resolve($authHost.post('api/feedback/getFeedbackOfType', {typeOfFeedback})))
    // },

    async getAllFeedback(){
        return new Promise((resolve) => resolve($authHost.post('api/feedback/getAllFeedback')))
    },

    async destroyFeedback( id ){
        return new Promise((resolve) => resolve($authHost.delete('api/feedback/destroyFeedback', { id })))
    }
} 

export default FeedbackService;