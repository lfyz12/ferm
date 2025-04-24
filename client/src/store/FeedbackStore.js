import { makeAutoObservable } from "mobx";
import FeedbackService from "../service/FeedbackService";


export default class FeedbackStore {
    constructor() {
        this._feedbacks = []
        makeAutoObservable(this)
    }

    setFeedback(feedbacks) {
        this._feedbacks = feedbacks
    }

    async getAll() {
        const response = await FeedbackService.getAllFeedback()
        this.setFeedback(response.data)
    }


    get feedbacks() {
        return this._feedbacks
    }
}