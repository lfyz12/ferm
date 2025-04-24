const ApiError = require('../error/ApiError')
const { BasketProduct, Assortment } = require('../models/models')
const basketController = require('./basketController')
const assortmentController = require('./assortmentController')


class BasketProductController {

    // Объединенный методы

    async getBasketProductsWithAssortmentInfoByBasketId(req, res, next) {
        try {
            const {basketId} = req.body
            const basketProducts = await BasketProduct.findAll({where: {basketId: basketId}})
            let ids = []
            basketProducts.forEach(basketProduct => {
                ids.push(Number(basketProduct['assortmentId']))
            })
            const assorment = await assortmentController.getAssortmentByIdsFromBack(ids)
            let basketProductsWithAssorment = []
            basketProducts.forEach(basketProduct => {
                assorment.forEach(product => {
                    if (basketProduct['assortmentId'] === product['id']) {
                        basketProduct = JSON.parse(JSON.stringify(basketProduct))
                        product = JSON.parse(JSON.stringify(product))
                        delete product['id']
                        basketProductsWithAssorment.push({...basketProduct, ...product})
                    }
                })
            })
            return res.json(basketProductsWithAssorment)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async createBasketProductAndReturnAllBasketProducts(req, res, next) {
        try {
            const { basketId, assortmentId, count, moreOrLess } = req.body
            const product = await Assortment.findOne({ where: { id: assortmentId } })
            const costPerOne = product['costPerOne']
            const basketProductOld = await BasketProduct.findOne({ where: { basketId: basketId, assortmentId: assortmentId } })
            if (basketProductOld) {
                await BasketProduct.update({ count: count + basketProductOld.count }, { where: { basketId: basketId, assortmentId: assortmentId } })
                basketController.updateSum(basketId)
                return res.json(await BasketProduct.findAll({ where: { basketId: basketId } }))
            }
            await BasketProduct.create({ basketId, assortmentId, count, costPerOne, moreOrLess })
            basketController.updateSum(basketId)
            return res.json(await BasketProduct.findAll({ where: { basketId: basketId } }))
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async createBasketProductFromBack(basketId, assortmentId, count, moreOrLess, next) {
        try {
            const basketProductOld = await BasketProduct.findOne({ where: { basketId: basketId, assortmentId: assortmentId } })
            if (basketProductOld) {
                await BasketProduct.update({ count: count + basketProductOld.count }, { where: { basketId: basketId, assortmentId: assortmentId } })
                basketController.updateSum(basketId)
                return
            }
            await BasketProduct.create({ basketId, assortmentId, count, moreOrLess })
            basketController.updateSum(basketId)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    //

    async createBasketProduct(req, res, next) {
        try {
            const { basketId, assortmentId, count, moreOrLess } = req.body
            const product = await Assortment.findOne({ where: { id: assortmentId } })
            const costPerOne = product['costPerOne']
            const basketProductOld = await BasketProduct.findOne({ where: { basketId: basketId, assortmentId: assortmentId } })
            if (basketProductOld) {
                await BasketProduct.update({ count: count + basketProductOld.count }, { where: { basketId: basketId, assortmentId: assortmentId } })
                basketController.updateSum(basketId)
                return res.json(await BasketProduct.findOne({ where: { basketId: basketId, assortmentId: assortmentId } }))
            }
            const basketProduct = await BasketProduct.create({ basketId, assortmentId, count, costPerOne, moreOrLess, name: product.name, image: product.image })
            basketController.updateSum(basketId)
            return res.json(basketProduct)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAllBasketProductsByBasketID(req, res, next) {
        try {
            const { basketId } = req.body
            const basketProduct = await BasketProduct.findAll({ where: { basketId: basketId } })
            return res.json(basketProduct)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async deleteAllBasketProductsByBasketID(req, res, next) {
        try {
            const { basketId } = req.body
            const deleted = await BasketProduct.destroy({ where: { basketId: basketId } })
            basketController.updateSum(basketId)
            return res.json(deleted)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async deleteOneBasketProductByBasketIDAndAssortmentID(req, res, next) {
        try {
            const { basketId, assortmentId } = req.body
            const deleted = await BasketProduct.destroy({ where: { basketId: basketId, assortmentId: assortmentId } })
            basketController.updateSum(basketId)
            return res.json(deleted)
        } catch (error) {
            next(ApiError.badRequest(e.message))
        }
    }

    async changeMoreOrLessByBasketIDAndAssortmentID(req, res, next) {
        try {
            const { basketId, assortmentId, moreOrLess } = req.body
            const updated = await BasketProduct.update({ moreOrLess: moreOrLess }, { where: { basketId: basketId, assortmentId: assortmentId } })
            return res.json(updated)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async changeMoreOrLessByBasketProductID(req, res, next) {
        try {
            const {id, moreOrLess} = req.body
            const updated = await BasketProduct.update({moreOrLess: moreOrLess}, {where: {id: id}})
            return res.json(updated)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async changeCountByBasketIDAndAssortmentID(req, res, next) {
        try {
            const { basketId, assortmentId, count } = req.body
            const updated = await BasketProduct.update({ count: count }, { where: { basketId: basketId, assortmentId: assortmentId } })
            basketController.updateSum(basketId)
            return res.json(updated)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new BasketProductController()