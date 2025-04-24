const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const { User, Basket, Order } = require('../models/models')
const tokenController = require('./tokenController')
const smsController = require('./smsController')
const UserDto = require('../dtos/userDto')

class UserController {

    async registration(req, res, next) {
        try {
            const { name, number, defaultAddress, password } = req.body

            if (!number || !password) {
                return next(ApiError.badRequest('Некорректный номер телефона или пароль'))
            }

            const candidate = await User.findOne({ where: { number: number } })

            if (candidate) {
                return next(ApiError.badRequest('Пользователь с таким номером телефона уже существует'))
            }

            const hashPassword = await bcrypt.hash(password, 5)
            const code = smsController.generateCode(5)
            const user = await User.create({ name, number, defaultAddress, password: hashPassword, activatedCode: code })
            smsController.sendCode(number, code)

            const userDto = new UserDto(user)
            const tokens = tokenController.generateTokens({ ...userDto })
            await tokenController.saveToken(userDto.id, tokens.refreshToken)

            await Basket.create({ userId: user.id, aproxSum: 0 })

            res.cookie('refreshToken', tokens.refreshToken, { maxAge: 10 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json({...tokens, user: {...userDto}})
            // res.cookie('accessToken', tokens.accessToken, {maxAge: 60 * 60 * 1000, httpOnly: true})
            // return res.json({ user: { ...userDto } })

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async sendCodeFromUser(req, res, next) {
        try {
            const { number } = req.body

            const user = await User.findOne({where:{number: number}})

            if (!number || !user) {
                return next(ApiError.badRequest('Некорректный номер телефона'))
            }

            const code = smsController.generateCode(5)
            smsController.sendCode(number, code)

            const updated = await User.update({ activatedCode: code }, { where: { number: number } })

            return res.json({ updated })

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async activate(req, res, next) {
        try {
            const { number, code } = req.body
            const user = await User.findOne({ where: { number: number } })

            if (!user) return  next(ApiError.badRequest('Некорректный номер телефона'))

            if (user['activatedCode'] == code) {
                await User.update({ isActivated: true }, { where: { number: number } })
                const updatedUser = await User.findOne({ where: { number: number } })
                const userDto = new UserDto(updatedUser)
                const tokens = tokenController.generateTokens({ ...userDto })
                await tokenController.saveToken(userDto.id, tokens.refreshToken)
                res.cookie('refreshToken', tokens.refreshToken, { maxAge: 10 * 24 * 60 * 60 * 1000, httpOnly: true })
                return res.json({...tokens, user: {...userDto}})
                // res.cookie('accessToken', tokens.accessToken, {maxAge: 60 * 60 * 1000, httpOnly: true})
                // return res.json({ user: { ...userDto } })
            }
            throw ApiError.badRequest('Введен неверный активационный код')

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async login(req, res, next) {
        try {
            const { number, password } = req.body
            const user = await User.findOne({ where: { number: number } })
            if (!user) {
                throw ApiError.badRequest('Неверный номер телефона или пароль')
            }
            const isPassEquals = bcrypt.compareSync(password, user.password)
            if (!isPassEquals) {
                throw ApiError.badRequest('Неверный номер телефона или пароль')
            }
            const userDto = new UserDto(user)
            const tokens = tokenController.generateTokens({ ...userDto })
            await tokenController.saveToken(userDto.id, tokens.refreshToken)


            res.cookie('refreshToken', tokens.refreshToken, { maxAge: 10 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json({...tokens, user: {...userDto}})
            // res.cookie('accessToken', tokens.accessToken, {maxAge: 60 * 60 * 1000, httpOnly: true})
            // return res.json({ user: { ...userDto } })

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies
            const deletedToken = await tokenController.removeToken(refreshToken)
            res.clearCookie('refreshToken')
            //res.clearCookie('accessToken')
            return res.json(deletedToken)

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies
            if (!refreshToken) {
                throw ApiError.badRequest('Не авторизован')
            }
            const userData = tokenController.validateRefreshToken(refreshToken)
            const tokenFromDb = tokenController.findToken(refreshToken)
            if (!userData || !tokenFromDb) {
                throw ApiError.badRequest('Не авторизован')
            }
            const user = await User.findOne({ where: { id: userData.id } })
            const userDto = new UserDto(user)
            const tokens = tokenController.generateTokens({ ...userDto })

            await tokenController.saveToken(userDto.id, tokens.refreshToken)

            res.cookie('refreshToken', tokens.refreshToken, { maxAge: 10 * 24 * 60 * 60 * 1000, httpOnly: true })
            //res.cookie('accessToken', tokens.accessToken, {maxAge: 60 * 60 * 1000, httpOnly: true})

            //return res.json({ user: userDto })
            return res.json({...tokens, user: {...userDto}})
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAllUsers(req, res, next) {
        try {
            return res.json(await User.findAll())
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }


    }




    async cheackCode(req, res, next) {
        try {
            const { number, code } = req.body
            const user = await User.findOne({ where: { number: number } })
            if (user.activatedCode === code) return res.json(true)
            return res.json(false)

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }










    //Для тестов и личного пользования, не в продакшн
    async createUser(req, res, next) {
        try {
            const { name, number, password } = req.body
            const hashPassword = await bcrypt.hash(password, 5)
            const user = await User.create({ name, number, password: hashPassword })
            await Basket.create({ userId: user['id'], aproxSum: 0 })
            return res.json(user)

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }


    async getUserByNumber(req, res, next) {
        try {
            const { number } = req.body
            const user = await User.findOne({ where: { number: number } })
            return res.json({ "id": user.id, "name": user.name, "number": user.number, "defaultAddress": user.defaultAddress })

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getUserByUserID(req, res, next) {
        try {
            const { id } = req.body
            const user = await User.findOne({ where: { id: id } })
            return res.json({ "id": user.id, "name": user.name, "number": user.number, "defaultAddress": user.defaultAddress })

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async changeDefaultAddressByNumber(req, res, next) {
        try {
            const { number, defaultAddress } = req.body
            const updated = await User.update({ defaultAddress: defaultAddress }, { where: { number: number } })
            return res.json(updated)

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async changeNumberByNumber(req, res, next) {
        try {
            const { oldNumber, newNumber } = req.body
            const updated = await User.update({ number: newNumber }, { where: { number: oldNumber } })
            return res.json(updated)

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async changeNameByNumber(req, res, next) {
        try {
            const { number, name } = req.body
            const user = await User.update({ name: name }, { where: { number: number } })
            return res.json(user)

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async changeDefaultAddressById(req, res, next) {
        try {
            const { defaultAddress, id } = req.body
            const user = await User.update({ defaultAddress: defaultAddress }, { where: { id: id } })
            return res.json(user)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async changeNumberById(req, res, next) {
        try {
            const { number, id } = req.body
            const user = await User.update({ number: number }, { where: { id: id } })
            return res.json(user)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async changeNameById(req, res, next) {
        try {
            const { name, id } = req.body
            const user = await User.update({ name: name }, { where: { id: id } })
            return res.json(user)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async changeNumberAndNameById(req, res, next) {
        try {
            const { number, name, id } = req.body
            const user = await User.update({ number: number, name: name }, { where: { id: id } })
            return res.json(user)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async changeAllById(req, res, next) {
        try {
            const { defaultAddress, number, name, id } = req.body
            const user = await User.update({ defaultAddress: defaultAddress, number: number, name: name }, { where: { id: id } })
            return res.json(user)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async changeRoleByNumber(req, res, next) {
        try {
            const { number, role } = req.body
            const user = await User.update({ role: role }, { where: { number: number } })
            return res.json(user)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async changePasswordbyNumber(req, res, next) {
        try {
            const { number, password } = req.body
            const hashPassword = await bcrypt.hash(password, 5)
            const user = await User.update({ password: hashPassword }, { where: { number: number } })
            return res.json(user)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

}


// Изменяем имя пользователя с `userId = 2`
// await User.update(
//     {
//       firstName: 'John',
//     },
//     {
//       where: {
//         userId: 2,
//       },
//     }
//   )


// try {

// } catch (e){

// }
module.exports = new UserController()