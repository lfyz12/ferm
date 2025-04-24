import { $authHost } from "../http";

const OrderService = {
    async createOrder(userId, address, aproxSum, onConfirm, comment, number) {
        return new Promise((resolve) => resolve($authHost.post('api/order/createOrder', { userId, address, aproxSum, onConfirm, comment, number })))
    },

    async createOrderByBasketId(userId, address, aproxSum, onConfirm, basketId, comment, number) {
        return new Promise((resolve) => resolve($authHost.post('api/order/createOrderByBasketId', {userId, address, aproxSum, onConfirm, basketId, comment, number})))
    },

    async getNotCanceledOrderByUserId(userId) {
        return new Promise((resolve) => resolve($authHost.post('api/order/getNotCanceledOrderByUserID', { userId })))
    },

    async getOnConfirmOrderByUserId(userId) {
        return new Promise((resolve) => resolve($authHost.post('api/order/getOnConfirmOrderByUserID', { userId })))
    },

    async getOrderByOrderId(id) {
        return new Promise((resovle) => resovle($authHost.post('api/order/getOrderByOrderID', { id })))
    },

    async getOrderByUserId(userId) {
        return new Promise((resovle) => resovle($authHost.post('api/order/getOrderByUserID', { userId })))
    },

    async getOneOrderByUserId(userId) {
        return new Promise((resolve) => resolve($authHost.post('api/order/getOneOrderByUserID', { userId })))
    },

    async getAll() {
        return new Promise((resolve) => resolve($authHost.post('api/order/getAll')))
    },

    async changeAddressByUserId(userId, address) {
        return new Promise((resolve) => resolve($authHost.put('api/order/changeAddressByUserID', { userId, address })))
    },

    async changeAddressByOrderId(id, address) {
        return new Promise((resolve) => resolve($authHost.put('api/order/changeAddressByOrderId', { id, address })))
    },

    async changeOnConfirmByOrderId(id, onConfirm) {
        return new Promise((resolve) => resolve($authHost.put('api/order/changeOnConfirmByOrderID', { id, onConfirm })))
    },

    async changeOnCreateByOrderId(id, onCreate) {
        return new Promise((resolve) => resolve($authHost.put('api/order/changeOnCreateByOrderID', { id, onCreate })))
    },

    async changeOnDeliverByOrderId(id, onDeliver) {
        return new Promise((resolve) => resolve($authHost.put('api/order/changeOnDeliverByOrderID', { id, onDeliver })))
    },

    async changeDeliveredByOrderId(id, delivered) {
        return new Promise((resolve) => resolve($authHost.put('api/order/changeDeliveredByOrderID', { id, delivered })))
    },

    async changeOrderProductsCountByOrderId(id, orderProductsCount) {
        return new Promise((resolve) => resolve($authHost.put('api/order/changeOrderProductsCountByOrderID', { id, orderProductsCount })))
    },

    async changeCourierNumber( id, courierNumber) {
        return new Promise((resolve) => resolve($authHost.put('api/order/changeNumberOfCourier', {  id, courierNumber})))
    },

    async changeCommentByOrderId(id, comment) {
        return new Promise((resolve) => resolve($authHost.put('api/order/changeCommentByOrderID', {id, comment})))
    },

    async changeNumberByOrderId(id, number) {
        return new Promise((resolve) => resolve($authHost.put('api/order/changeNumberByOrderID', {id, number})))
    },

    async changeCommentAndNumberByOrderId(id, comment, number) {
        return new Promise((resolve) => resolve($authHost.put('api/order/changeCommentAndNumberByOrderID', {id, comment, number})))
    },

    async delOrder(id) {
        return new Promise((resolve) => resolve($authHost.post('api/order/del', {id})))
    },

    async cancelOrderByIdFromUser(id) {
        return new Promise((resolve) => resolve($authHost.post('api/order/cancelOrderByIdFromUser', {id})))
    }
}

export default OrderService