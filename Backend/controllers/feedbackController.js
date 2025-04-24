const ApiError = require('../error/ApiError')
const { Feedback } = require('../models/models')

class FeedbackController {
    async sendFeedback(req, res, next) {
        try {
            const { typeOfFeedback, userEmail, userFIO, feedbackMessage } = req.body
            const feedback = await Feedback.create({ typeOfFeedback, userEmail, userFIO, feedbackMessage })
            return res.json(feedback)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getFeedbackOfType(req, res, next) {
        try {
            const { typeOfFeedback } = req.body
            const feedback = await Feedback.findAll({ where: { typeOfFeedback: typeOfFeedback } })
            return res.json(feedback)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAllFeedback(req, res, next) {
        try {
            return res.json(await Feedback.findAll())
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async destroyFeedback(req, res, next) {
        try {
            const { id } = req.body
            const feedback = await Feedback.destroy({ where: { id: id } })
            return res.json(feedback)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }



}


module.exports = new FeedbackController()