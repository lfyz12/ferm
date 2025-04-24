const Router = require('express')
const router = new Router()
const activatedMiddleware = require('../middleware/ActivatedMiddleware')
const authMiddleware = require('../middleware/AuthMiddleware')
const orderProductController = require('../controllers/orderProductController')

//Объединенные

router.post('/getOrderProductsWithAssortmentInfoByOrderId', authMiddleware, activatedMiddleware, orderProductController.getOrderProductsWithAssortmentInfoByOrderId)

//

router.post('/createOrderProduct', authMiddleware, activatedMiddleware, orderProductController.createOrderProduct)

router.post('/getOrderProductByOrderID', authMiddleware, activatedMiddleware, orderProductController.getOrderProductByOrderID)

router.post('/deleteOrderProductByOrderId', authMiddleware, activatedMiddleware, orderProductController.deleteOrderProductByOrderId)

module.exports = router