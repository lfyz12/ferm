const Router = require('express')
const router = new Router()
const activatedMiddleware = require('../middleware/ActivatedMiddleware')
const authMiddleware = require('../middleware/AuthMiddleware')
const basketProductController = require('../controllers/basketProductController')

//Объединенные

router.post('/getBasketProductsWithAssortmentInfoByBasketID', authMiddleware, activatedMiddleware, basketProductController.getBasketProductsWithAssortmentInfoByBasketId)
router.post('/createBasketProductAndReturnAllBasketProducts', authMiddleware, activatedMiddleware, basketProductController.createBasketProductAndReturnAllBasketProducts)

//

router.post('/createBasketProduct', authMiddleware, activatedMiddleware, basketProductController.createBasketProduct)

router.post('/getAllBasketProductsByBasketID', authMiddleware, activatedMiddleware, basketProductController.getAllBasketProductsByBasketID)

router.post('/deleteAllBasketProductsByBasketID', authMiddleware, activatedMiddleware, basketProductController.deleteAllBasketProductsByBasketID)
router.post('/deleteOneBasketProductByBasketIDAndAssortmentID', authMiddleware, activatedMiddleware, basketProductController.deleteOneBasketProductByBasketIDAndAssortmentID)

router.put('/changeMoreOrLessByBasketIDAndAssortmentID', authMiddleware, activatedMiddleware, basketProductController.changeMoreOrLessByBasketIDAndAssortmentID)
router.put('/changeCountByBasketIDAndAssortmentID', authMiddleware, activatedMiddleware, basketProductController.changeCountByBasketIDAndAssortmentID)
router.put('/changeMoreOrLessByBasketProductID', authMiddleware, activatedMiddleware, basketProductController.changeMoreOrLessByBasketProductID)

module.exports = router