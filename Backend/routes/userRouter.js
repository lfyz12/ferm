const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/AuthMiddleware')
const activatedMiddleware = require('../middleware/ActivatedMiddleware')
const checkRole = require('../middleware/CheckRoleMiddleware')

router.post('/createUser', authMiddleware, checkRole(['ADMIN']), userController.createUser)
router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.post('/logout', authMiddleware, userController.logout)
router.post('/cheackCode', userController.cheackCode)

router.get('/refresh', userController.refresh)
router.post('/getUserByNumber', authMiddleware, userController.getUserByNumber)
router.post('/getAll', checkRole(['ADMIN']), userController.getAllUsers)
router.post('/getUserByUserID', authMiddleware, userController.getUserByUserID)

router.put('/sendCode', userController.sendCodeFromUser)
router.put('/activate', userController.activate)
router.put('/changeDefaultAddressByNumber', authMiddleware, userController.changeDefaultAddressByNumber)
router.put('/changeNumberByNumber', authMiddleware, userController.changeNumberByNumber)
router.put('/changeNameByNumber', authMiddleware, userController.changeNameByNumber)
router.put('/changeDefaultAddressByID', authMiddleware, userController.changeDefaultAddressById)
router.put('/changeNumberByID', authMiddleware, userController.changeNameById)
router.put('/changeNameByID', authMiddleware, userController.changeNameById)
router.put('/changeNumberAndNameByID', authMiddleware, userController.changeNumberAndNameById)
router.put('/changeAllByID', authMiddleware, userController.changeAllById)
router.put('/changeRoleByNumber', checkRole(['ADMIN']), userController.changeRoleByNumber)
router.put('/changePasswordbyNumber', userController.changePasswordbyNumber)


module.exports = router