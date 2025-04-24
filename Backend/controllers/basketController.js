const ApiError = require('../error/ApiError')
const {Basket, BasketProduct, Assortment} = require('../models/models')


class BasketController {
    async createBasket(req, res, next) {
        try {
            const {userId} = req.body
            const aproxSum = 0
            const basket = await Basket.create({userId, aproxSum})
            return res.json(basket)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getBasketByUserID(req, res, next) {
        try {
            const {userId} = req.body
            const basket = await Basket.findOne({where:{userId: userId}})
            return res.json(basket)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getBasketByBasketID(req, res, next) {
        try {
            const {id} = req.body
            const basket = await Basket.findOne({where:{id: id}})
            return res.json(basket)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async updateSum(id) {
        const basketProducts = await BasketProduct.findAll({where: {basketId: id}})
        let newSum = 0
        basketProducts.forEach(element => newSum += element['count'] * element['costPerOne'])
        await Basket.update({aproxSum: newSum}, {where: {id: id}})
    }
}

module.exports = new BasketController()