const Router = require('express')
const router = new Router()
const assortmentController = require('../controllers/assortmentController')
const checkRole = require('../middleware/CheckRoleMiddleware')

router.post('/createProduct', checkRole(['ADMIN', 'ADMIN_EDIT']), assortmentController.create)

router.post('/getAll', assortmentController.getAll)
router.post('/getOne', assortmentController.getById)
router.post('/getAllByProductByName', assortmentController.getAllByName)
router.post('/getAllProductsByType', assortmentController.getAllByType)
router.post('/getAllProductsByAvailable', assortmentController.getAllByAvailable)
router.post('/getAllProductsByTypeAndAvailable', assortmentController.getAllByTypeAndAvailable)
router.post('/getAllProductsByTypeAndName', assortmentController.getAllByTypeAndName)
router.post('/getAssortmentByIds', assortmentController.getAssortmentByIds)


router.post('/deleteProductById', checkRole(['ADMIN', 'ADMIN_EDIT']), assortmentController.deleteOneById)

router.put('/changeProductNameByName', checkRole(['ADMIN', 'ADMIN_EDIT']), assortmentController.changeNameByName)
router.put('/changeProductAvailableByName', checkRole(['ADMIN', 'ADMIN_EDIT', 'CASHIER']), assortmentController.changeAvailableByName)
router.put('/changeProductCostPerOneByName', checkRole(['ADMIN', 'ADMIN_EDIT']), assortmentController.changeCostPerOneByName)
router.put('/changeProductDescriptionByName', checkRole(['ADMIN', 'ADMIN_EDIT']), assortmentController.changeDescriptionByName)
router.put('/changeProductCompositionByName', checkRole(['ADMIN', 'ADMIN_EDIT']),  assortmentController.changeCompositionByName)
router.put('/changeProductImageByName', checkRole(['ADMIN', 'ADMIN_EDIT']), assortmentController.changeImageByName)
router.put('/changeTypeByName', checkRole(['ADMIN', 'ADMIN_EDIT']), assortmentController.changeTypeByName)

router.put('/changeAllById', assortmentController.changeAllById)
router.put('/changeAllTextById', assortmentController.changeAllTextById)

module.exports = router