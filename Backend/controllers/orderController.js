const ApiError = require('../error/ApiError')
const { Order, OrderProduct, BasketProduct, User, Basket} = require('../models/models')
const basketController = require('./basketController')

class OrderController {

    //Объединенные методы

    async createOrderByBasketId(req, res, next) {
        try {
            const { userId, address, aproxSum, onConfirm, basketId, comment, number } = req.body
            const order = await Order.create({ userId, address, aproxSum, onConfirm, comment, number })
            const basketProducts = await BasketProduct.findAll({ where: { basketId: basketId } })
            basketProducts.forEach(basketProduct => {
                OrderProduct.create({
                    orderId: order['id'], assortmentId: basketProduct['assortmentId'], count: basketProduct['count'],
                    moreOrLess: basketProduct['moreOrLess']
                })
            })
            BasketProduct.destroy({ where: { basketId: basketId } })
            basketController.updateSum(basketId)
            return res.json(order)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    //

    async createOrder(req, res, next) {
        try {
            const { userId, address, aproxSum, onConfirm, comment, number } = req.body
            const order = await Order.create({ userId, address, aproxSum, onConfirm, comment, number })
            return res.json(order)

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            const orders = await Order.findAll({ where: { onConfirm: true } })
            return res.json(orders)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getNotCanceledOrderByUserID(req, res, next) {
        try {
            const { userId } = req.body
            const order = await Order.findOne({ where: { userId: userId, canceled: false } })
            return res.json(order)

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getOnConfirmOrderByUserID(req, res, next) {
        try {
            const { userId } = req.body
            const order = await Order.findOne({ where: { userId: userId, onConfirm: true } })
            return res.json(order)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getOrderByOrderID(req, res, next) {
        try {
            const { id } = req.body
            const order = await Order.findOne({ where: { id: id } })
            return res.json(order)

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getOrderByUserID(req, res, next) {
        try {
            const { userId } = req.body
            const order = await Order.findAll({ where: { userId: userId } })
            return res.json(order)

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getOneOrderByUserID(req, res, next) {
        try {
            const { userId } = req.body
            const order = await Order.findOne({ where: { userId: userId } })
            return res.json(order)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async changeAddressByUserID(req, res, next) {
        try {
            const { userId, address } = req.body
            const updated = await Order.update({ address: address }, { where: { userId: userId } })
            return res.json(updated)

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async changeAddressByOrderID(req, res, next) {
        try {
            const { id, address } = req.body
            const updated = await Order.update({ address: address }, { where: { id: id } })
            return res.json(updated)

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async changeOnConfirmByOrderID(req, res, next) {
        try {
            const { id, onConfirm } = req.body
            const updated = await Order.update({ onConfirm: onConfirm }, { where: { id: id } })
            return res.json(updated)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async changeOnCreateByOrderID(req, res, next) {
        try {
            const { id, onCreate } = req.body
            const updated = await Order.update({ onCreate: onCreate }, { where: { id: id } })
            return res.json(updated)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async changeOnDeliverByOrderID(req, res, next) {
        try {
            const { id, onDeliver } = req.body
            const updated = await Order.update({ onDeliver: onDeliver }, { where: { id: id } })
            return res.json(updated)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async changeDeliveredByOrderID(req, res, next) {
        try {
            const { id, delivered } = req.body
            const updated = await Order.update({ delivered: delivered }, { where: { id: id } })
            return res.json(updated)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async changeOrderProductsCountByOrderID(req, res, next) {
        try {
            const { id, orderProductsCount } = req.body
            const updated = await Order.update({ orderProductsCount: orderProductsCount }, { where: { id: id } })
            return res.json(updated)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async changeCourierNumber(req, res, next) {
        try {
            const { id, courierNumber } = req.body
            const updated = await Order.update({ courierNumber: courierNumber }, { where: { id: id } })
            return res.json(updated)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async changeCommentByOrderID(req, res, next) {
        try {
            const { id, comment } = req.body
            const updated = await Order.update({ comment: comment }, { where: { id: id } })
            return res.json(updated)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async changeNumberByOrderID(req, res, next) {
        try {
            const { id, number } = req.body
            const updated = await Order.update({ number: number }, { where: { id: id } })
            return res.json(updated)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async changeCommentAndNumberByOrderID(req, res, next) {
        try {
            const { id, comment, number } = req.body
            const updated = await Order.update({ comment: comment, number: number }, { where: { id: id } })
            return res.json(updated)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    /// ИЗМЕНИТЬ ОТМЕНУ ЗАКАКЗА
    async delOrder(req, res, next) {
        try {
            const { id } = req.body
            const deleted = await Order.destroy({ where: { id: id } })
            return res.json(deleted)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    ///

    async cancelOrderByIdFromUser(req, res, next) {
        try {
            const {id} = req.body
            const canceled = await Order.update({canceled: true}, {where: {id: id}})
            return res.json(canceled)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

}

module.exports = new OrderController()