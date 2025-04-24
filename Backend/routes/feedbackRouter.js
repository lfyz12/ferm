const Router = require('express')
const router = new Router()
const activatedMiddleware = require('../middleware/ActivatedMiddleware')
const authMiddleware = require('../middleware/AuthMiddleware')
const checkRole = require('../middleware/CheckRoleMiddleware')
const feedbackController = require('../controllers/feedbackController')

router.post('/sendFeedback', authMiddleware, activatedMiddleware, feedbackController.sendFeedback)

router.post('/getFeedbackOfType', checkRole(['ADMIN']), feedbackController.getFeedbackOfType)
router.post('/getAllFeedback', checkRole(['ADMIN']), feedbackController.getAllFeedback)

router.delete('/destroyFeedback', checkRole(['ADMIN']), feedbackController.destroyFeedback)


module.exports = router
