const Router = require('express')
const router = new Router()
const activatedMiddleware = require('../middleware/ActivatedMiddleware')
const authMiddleware = require('../middleware/AuthMiddleware')
const basketController = require('../controllers/basketController')

router.post('/createBasket', authMiddleware, basketController.createBasket)

router.post('/getBasketByUserID', authMiddleware, activatedMiddleware, basketController.getBasketByUserID)
router.post('/getBasketByBasketID', authMiddleware, activatedMiddleware, basketController.getBasketByBasketID)

module.exports = router