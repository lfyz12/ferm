const Router = require('express')
const router = new Router()
const authMiddleware = require('../middleware/AuthMiddleware')
const activatedMiddleware = require('../middleware/ActivatedMiddleware')
const checkRole = require('../middleware/CheckRoleMiddleware')
const orderController = require('../controllers/orderController')

//Объединенные

router.post('/createOrderByBasketId', authMiddleware, activatedMiddleware, orderController.createOrderByBasketId)

//

router.post('/del', orderController.delOrder)
router.post('/cancelOrderByIdFromUser', authMiddleware, activatedMiddleware, orderController.cancelOrderByIdFromUser)

router.post('/createOrder', authMiddleware, activatedMiddleware, orderController.createOrder)

router.post('/getNotCanceledOrderByUserID', authMiddleware, activatedMiddleware, orderController.getNotCanceledOrderByUserID)
router.post('/getOnConfirmOrderByUserID', authMiddleware, activatedMiddleware, orderController.getOnConfirmOrderByUserID)
router.post('/getOrderByOrderID', authMiddleware, activatedMiddleware, orderController.getOrderByOrderID)
router.post('/getOrderByUserID', authMiddleware, activatedMiddleware, orderController.getOrderByUserID)
router.post('/getOneOrderByUserID', authMiddleware, activatedMiddleware, orderController.getOneOrderByUserID)
router.post('/getAll', authMiddleware, activatedMiddleware, checkRole(['ADMIN', 'ADMIN_EDIT', 'OPERATOR']), orderController.getAll)

router.put('/changeAddressByUserID', authMiddleware, activatedMiddleware, orderController.changeAddressByUserID)
router.put('/changeAddressByOrderID', authMiddleware, activatedMiddleware, orderController.changeAddressByOrderID)
router.put('/changeOnConfirmByOrderID', authMiddleware, activatedMiddleware, orderController.changeOnConfirmByOrderID)
router.put('/changeOnCreateByOrderID', authMiddleware, activatedMiddleware, orderController.changeOnCreateByOrderID)
router.put('/changeOnDeliverByOrderID', authMiddleware, activatedMiddleware, orderController.changeOnDeliverByOrderID)
router.put('/changeDeliveredByOrderID', authMiddleware, activatedMiddleware, orderController.changeDeliveredByOrderID)
router.put('/changeOrderProductsCountByOrderID', authMiddleware, activatedMiddleware, orderController.changeOrderProductsCountByOrderID)
router.put('/changeNumberOfCourier', authMiddleware, activatedMiddleware, orderController.changeCourierNumber)
router.put('/changeCommentByOrderID', orderController.changeCommentByOrderID)
router.put('/changeNumberByOrderID', orderController.changeNumberByOrderID)
router.put('/changeCommentAndNumberByOrderID', orderController.changeCommentAndNumberByOrderID)

module.exports = router