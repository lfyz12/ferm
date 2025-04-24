const ApiError = require('../error/ApiError')
const {ComplitedOrderProduct} = require('../models/models')
const assortmentController = require('./assortmentController')

class ComplitedOrderProductController {

    // Объединенные методы

    async getComplitedOrderProductsWithAssortmentInfoByComplitedOrderId(req, res, next) {
        try {
            const {complitedOrderId} = req.body
            const complitedOrderProducts = await ComplitedOrderProduct.findAll({where: {complitedOrderId: complitedOrderId}})
            let ids = []
            complitedOrderProducts.forEach(complitedOrderProduct => {
                ids.push(Number(complitedOrderProduct['assortmentId']))
            })
            const assortment = await assortmentController.getAssortmentByIdsFromBack(ids)
            let complitedOrderProductsWithAssortment = []
            complitedOrderProducts.forEach(complitedOrderProduct => {
                assortment.forEach(product => {
                    if (complitedOrderProduct['assortmentId'] === product['id']) {
                        complitedOrderProduct = JSON.parse(JSON.stringify(complitedOrderProduct))
                        product = JSON.parse(JSON.stringify(product))
                        delete product['id']
                        // delete complitedOrderProduct['assortmentId']
                        complitedOrderProductsWithAssortment.push({...complitedOrderProduct, ...product})
                    }
                })
            })
            return res.json(complitedOrderProductsWithAssortment)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    //

    async createComplitedOrderProduct(req, res, next) {
        try {
            const {complitedOrderId, assortmentId, count} = req.body
            const complitedOrderProduct = await ComplitedOrderProduct.create({complitedOrderId, assortmentId, count})
            return res.json(complitedOrderProduct)

        } catch (e){
            next(ApiError.badRequest(e.message))
            
        }

    }

    async getComplitedOrderProductByComplitedOrderID(req, res, next) {
        try {
            const {complitedOrderId} = req.body
            const complitedOrderProduct = await ComplitedOrderProduct.findAll({where:{complitedOrderId: complitedOrderId}})
            return res.json(complitedOrderProduct)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }
}

module.exports = new ComplitedOrderProductController()