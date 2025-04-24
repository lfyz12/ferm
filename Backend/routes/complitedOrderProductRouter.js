const Router = require('express')
const router = new Router()
const activatedMiddleware = require('../middleware/ActivatedMiddleware')
const complitedOrderProductController = require('../controllers/complitedOrderProductController')
const authMiddleware = require('../middleware/AuthMiddleware')

//Объединенные

router.post('/getComplitedOrderProductsWithAssortmentInfoByComplitedOrderId', authMiddleware, activatedMiddleware, complitedOrderProductController.getComplitedOrderProductsWithAssortmentInfoByComplitedOrderId)

//

router.post('/createComplitedOrderProduct', authMiddleware, activatedMiddleware, complitedOrderProductController.createComplitedOrderProduct)

router.post('/getComplitedOrderProductByComplitedOrderID', authMiddleware, activatedMiddleware, complitedOrderProductController.getComplitedOrderProductByComplitedOrderID)

module.exports = router