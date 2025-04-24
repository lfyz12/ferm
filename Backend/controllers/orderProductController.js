const ApiError = require('../error/ApiError')
const {OrderProduct, Assortment} = require('../models/models')
const assortmentController = require('./assortmentController')

class OrderProductController {

    // Объединенные методы

    async getOrderProductsWithAssortmentInfoByOrderId(req, res, next) {
        try {
            const {orderId} = req.body
            const orderProducts = await OrderProduct.findAll({where: {orderId: orderId}})
            let ids = []
            orderProducts.forEach(orderProduct => {
                ids.push(Number(orderProduct['assortmentId']))
            })
            const assortment = await assortmentController.getAssortmentByIdsFromBack(ids)
            let orderProductsWithAssortment = []
            orderProducts.forEach(orderProduct => {
                assortment.forEach(product => {
                    if (orderProduct['assortmentId'] === product['id']) {
                        orderProduct = JSON.parse(JSON.stringify(orderProduct))
                        product = JSON.parse(JSON.stringify(product))
                        delete product['id']
                        delete orderProduct['assortmentId']
                        orderProductsWithAssortment.push({...orderProduct, ...product})
                    }
                })
            })
            return res.json(orderProductsWithAssortment)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    //


    async createOrderProduct(req, res, next) {
        try {
            const {orderId, assortmentId, count, moreOrLess} = req.body
            const orderProduct = await OrderProduct.create({orderId, assortmentId, count, moreOrLess})
            return res.json(orderProduct)

        } catch (e){
            next(ApiError.badRequest(e.message))
            
        }

    }

    async getOrderProductByOrderID(req, res, next) {
        try {
            const {orderId} = req.body
            const orderProduct = await OrderProduct.findAll({where:{orderId:orderId}})
            return res.json(orderProduct)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async deleteOrderProductByOrderId(req, res, next) {
        try {
            const {orderId} = req.body
            const deleted = await OrderProduct.destroy({where:{orderId:orderId}})
            return res.json(deleted)

        } catch (e){
            next(ApiError.badRequest(e.message))
            
        }

    }
}

module.exports = new OrderProductController()